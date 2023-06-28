/**
 * Array für zugewiesene Kontakte
 * @type {Object[]}
 */
let assigned = []; // Neues Array für zugewiesene Kontakte


/**
 * Lädt alle Aufgaben und Kontakte aus dem Remote Storage
 * @returns {Promise<void>}
 */
async function loadArray() {
  tasks = await getBoardFromRemoteStorage();
  await getContactsFromRemoteStorage();
  await loadContacts();
  setMinDateAttribute();
  priorityMediumAddTask();
}


/**
 * Erstellt eine neue Aufgabe
 * 
 */
async function createTask() {
  let title = document.getElementById('titleInputAddTask').value;
  let description = document.getElementById('descriptionInputAddTask').value;
  let category = document.getElementById('categoryInputAddTask').value;
  let dueDate = document.getElementById('dueDateInputAddTask').value;

 
  let priority = 'medium'; // Standardpriorität (falls nichts ausgewählt). 
  if (document.getElementById('buttonUrgentAddTask').classList.contains('urgent-background')) {
    priority = 'urgent';
  } else if (document.getElementById('buttonMediumAddTask').classList.contains('medium-background')) {
    priority = 'medium';
  } else if (document.getElementById('buttonLowAddTask').classList.contains('low-background')) {
    priority = 'low';
  }

 
  let subtasks = [];
  setSubtasks(subtasks);

  let subtaskStatus = [];
  subtasks.forEach(() => {
    subtaskStatus.push(false); // Push false in das subtaskStatus-Array
  });


  /**
   * @type {Object}
   */
  let newTask = {
    id: generateUniqueId(),
    title: title,
    description: description,
    category: category,
    dueDate: dueDate,
    assigned: assigned,
    kanban: 'to-do',
    priority: priority,
    subtasks: subtasks,
    subtaskStatus: subtaskStatus // Array mit false-Werten für Subtask-Status
  };

  tasks.push(newTask);

  setFieldsToStandard();
  resetPriority();
  setBoardToRemoteStorage();
  taskAddedReport();
}


/**
 * Alle hinzugefügten Subtasks werden in das Array der Aufgabe gepusht
 * @param {string[]} subtasks - Das Array der Subtasks
 */
function setSubtasks(subtasks) {
  
  let subtaskElements = document.getElementsByClassName('subtask');
  for (let i = 0; i < subtaskElements.length; i++) {
    let subtask = subtaskElements[i].innerText.trim();
    subtasks.push(subtask);
  }
}


/**
 * Setzt alle ausgefüllten Felder wieder zurück, nachdem eine Aufgabe erstellt wurde.
 */
function setFieldsToStandard() {
  document.getElementById('titleInputAddTask').value = '';
  document.getElementById('descriptionInputAddTask').value = '';
  document.getElementById('categoryInputAddTask').value = '';
  document.getElementById('dueDateInputAddTask').value = '';
  document.getElementById('subtaskContainer').innerHTML = '';
}


/**
 * Setzt die Buttons für die Priorität wieder zurück, nachdem eine Aufgabe erstellt wurde.
 */
function resetPriority() {
  document.getElementById('buttonUrgentAddTask').classList.remove('urgent-background');
  document.getElementById('buttonMediumAddTask').classList.remove('medium-background');
  document.getElementById('buttonLowAddTask').classList.remove('low-background');
}


/**
 * Gibt eine Rückmeldung, dass eine Aufgabe erstellt wurde.
 */
function taskAddedReport() {
  document.getElementById('successMessage').classList.remove('d-none');
  setTimeout(function () {
    window.location.href = '../board/board.html';
  }, 1700); // Warte 1,7 Sekunden, bevor zur Board Ansicht weitergeleitet wird
}


/**
 * Die Möglichkeit, eine Subtask hinzuzufügen.
 */
function addSubtask() {
  /**
   * @type {string}
   */
  let subtask = document.getElementById('subtaskInput').value;

  if (subtask === '') {
    alert('Please enter a subtask.');
  } else {
    /**
     * @type {HTMLElement}
     */
    let container = document.getElementById('subtaskContainer');
    container.innerHTML += `<label class="subtask"> <input type="checkbox"> ${subtask} </label>`;
    document.getElementById('subtaskInput').value = '';
  }
}


/**
 * Lädt alle Kontakte aus der Kontaktliste.
 */
function loadContacts() {
  let contactsField = document.getElementById('assignedCheckboxContainer');
  contactsField.innerHTML = '';

  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    contactsField.innerHTML += `<label onclick="doNotClose(event)" class="label d-none"><input type="checkbox" onchange="handleContactCheckboxChange(this, ${i})"> ${contact['firstName']} ${contact['lastName']} </label>`;
  }
}

  function doNotClose(event){
    event.stopPropagation();
  }

/**
 * Zeigt alle Kontakte aus der Kontaktliste an.
 */
function showContacts() {
  console.log("showContacts function");
  let labels = document.getElementsByClassName('label');
  let container = document.getElementById('selectContacts');

  if (container.classList.contains('bordernone')) {
    container.classList.remove('bordernone')
  } else {
    container.classList.add('bordernone');
  }

  for (let i = 0; i < labels.length; i++) {
    if (labels[i].classList.contains('d-none')) {
      labels[i].classList.remove('d-none');
    } else {
      labels[i].classList.add('d-none');
    }
  }

  let contacts = document.getElementById('assignedCheckboxContainer');

  if (contacts.classList.contains('border-bottom')) {
    contacts.classList.remove('border-bottom')
  } else {
    contacts.classList.add('border-bottom');
  }

}


/**
 * Ermöglicht mit der Checkbox das Zuweisen und Entfernen eines Kontaktes.
 * @param {HTMLInputElement} checkbox - Die Checkbox
 * @param {number} index - Der Index des Kontakts
 */
function handleContactCheckboxChange(checkbox, index) {
  let selectedContact = contacts[index];

  if (checkbox.checked) {
    assigned.push(selectedContact);
  } else {
    let contactIndex = assigned.findIndex((contact) => contact === selectedContact);
    assigned.splice(contactIndex, 1);
  }
}


/**
 * Aktualisiert das Array mit den jeweiligen Kontakten.
 * @param {Object} contact - Der Kontakt
 */
function updateAssignedArray(contact) {
  let contactIndex = assigned.findIndex((assignedContact) => assignedContact === contact);
  if (contactIndex !== -1) {
    assigned.splice(contactIndex, 1);
  }
}


/**
 * Setzt alle Checkboxen wieder zurück, nachdem eine Aufgabe erstellt wurde.
 */
function resetCheckboxes() {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
}


/**
 * Erstellt eine einzigartige ID.
 * @returns {number} - Die einzigartige ID
 */
function generateUniqueId() {
  var timestamp = new Date().getTime();
  var randomNum = Math.floor(Math.random() * 10000);
  var uniqueId = parseInt(timestamp.toString() + randomNum.toString());
  return uniqueId;
}


/**
 * Setzt die Priorität für die erstellte Aufgabe auf "dringend".
 */
function priorityUrgentAddTask() {
  document.getElementById('buttonUrgentAddTask').classList.add('urgent-background');
  document.getElementById('urgent-image').src = "../img/urgent-symbol.png";
  document.getElementById('buttonMediumAddTask').classList.remove('medium-background');
  document.getElementById('medium-image').src = "../img/priority-medium.png";
  document.getElementById('buttonLowAddTask').classList.remove('low-background');
  document.getElementById('low-image').src = "../img/priority-low.png";
}


/**
 * Setzt die Priorität für die erstellte Aufgabe auf "mittel".
 */
function priorityMediumAddTask() {
  document.getElementById('buttonMediumAddTask').classList.add('medium-background');
  document.getElementById('medium-image').src = "../img/medium-symbol.svg";
  document.getElementById('buttonUrgentAddTask').classList.remove('urgent-background');
  document.getElementById('urgent-image').src = "../img/priority-urgent.png";
  document.getElementById('buttonLowAddTask').classList.remove('low-background');
  document.getElementById('low-image').src = "../img/priority-low.png";
}


/**
 * Setzt die Priorität für die erstellte Aufgabe auf "niedrig".
 */
function priorityLowAddTask() {
  document.getElementById('buttonLowAddTask').classList.add('low-background');
  document.getElementById('low-image').src = "../img/low-symbol.svg";
  document.getElementById('buttonUrgentAddTask').classList.remove('urgent-background');
  document.getElementById('urgent-image').src = "../img/priority-urgent.png";
  document.getElementById('buttonMediumAddTask').classList.remove('medium-background');
  document.getElementById('medium-image').src = "../img/priority-medium.png";
}


/**
 * Setzt ein Mindestdatum.
 */
function setMinDateAttribute() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  var nextyyyy = yyyy + 1; 
  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {                                                                          
    mm = '0' + mm;
  }
  today = yyyy + '-' + mm + '-' + dd;
  const nextYear = nextyyyy + '-' + mm + '-' + dd;
  document.getElementById("dueDateInputAddTask").setAttribute("min", today);
  document.getElementById("dueDateInputAddTask").setAttribute("max", nextYear);
}

// Event-Listener für Klick-Ereignisse im gesamten Dokument
document.addEventListener('click', function(event) {
  let contactMenu = document.getElementById('selectContacts');
  let targetElement = event.target; // geklicktes Element


  // Überprüfen, ob das geklickte Element Teil des Dropdown-Menüs ist oder ob das Menü geöffnet ist
  if (!contactMenu.contains(targetElement)) {

    contactMenu.classList.remove('bordernone');

    let labels = document.getElementsByClassName('label');
    for (let i = 0; i < labels.length; i++) {
      labels[i].classList.add('d-none');
    }
  }

});


document.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) { // Überprüfen, ob die Enter-Taste gedrückt wurde
    if (document.activeElement.id == 'subtaskInput') { // Überprüfen, ob das aktive Element das Subtask-Eingabefeld ist
      addSubtask(); 
      event.preventDefault(); 
    }
  }
});

function clearAddTaskForm(){
  window.location.reload();
}

function setTodayDate() {
  var today = new Date();
  var dueDateInput = document.getElementById('dueDateInputAddTask');
  dueDateInput.value = formatDate(today);
}

function formatDate(date) {
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  return year + '-' + month + '-' + day;
}