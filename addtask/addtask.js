let assigned = []; // Neues Array für zugewiesene Kontakte

async function loadArray() {
  tasks = await getBoardFromRemoteStorage();
  await getContactsFromRemoteStorage();
  await loadContacts();
}

async function createTask() {
  let title = document.getElementById('titleInput').value;
  let description = document.getElementById('descriptionInput').value;
  let category = document.getElementById('categoryInput').value;
  let dueDate = document.getElementById('dueDateInput').value;

  let priority = '';
  if (document.getElementById('buttonUrgent').classList.contains('urgent-background')) {
    priority = 'urgent';
  } else if (document.getElementById('buttonMedium').classList.contains('medium-background')) {
    priority = 'medium';
  } else if (document.getElementById('buttonLow').classList.contains('low-background')) {
    priority = 'low';
  }

  let subtasks = [];
  setSubtasks(subtasks);

  let subtaskStatus = [];
  subtasks.forEach(() => {
    subtaskStatus.push(false); // Push false in das subtaskStatus-Array
  });

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

// PUSHT ALLE HINZUGEFÜGTEN SUBTASKS INS SUTBASK ARRAY
function setSubtasks(subtasks){
  let subtaskElements = document.getElementsByClassName('subtask');
  for (let i = 0; i < subtaskElements.length; i++) {
    let subtask = subtaskElements[i].innerText.trim();
    subtasks.push(subtask);
  }
}
 
// SETZT ALLE FELDER AUF STANDARD NACH ERSTELLUNG
function setFieldsToStandard() {
  document.getElementById('titleInput').value = '';
  document.getElementById('descriptionInput').value = '';
  document.getElementById('categoryInput').value = '';
  document.getElementById('dueDateInput').value = '';
  document.getElementById('assignedContacts').innerHTML = '';
  document.getElementById('subtaskContainer').innerHTML = '';
}

// SETZT PRIO BUTTONS WIEDER AUF STANDARD
function resetPriority() {
  document.getElementById('buttonUrgent').classList.remove('urgent-background');
  document.getElementById('buttonMedium').classList.remove('medium-background');
  document.getElementById('buttonLow').classList.remove('low-background');
}

// MELDUNG DASS TASK ERFOLGREICHT ERSTELLT WURDE
function taskAddedReport() {
  document.getElementById('successMessage').classList.remove('d-none');
  setTimeout(function () {
    window.location.href = '../board/board.html';
  }, 1500); // Warte 1,5 Sekunden, bevor zur Board Ansicht weitergeleitet wird
}

// FÜGT SUBTASKS HINZU 
function addSubtask() {
  let subtask = document.getElementById('subtaskInput').value;

  if (subtask === '') {
    alert('Please enter a subtask.');
  } else {
    let container = document.getElementById('subtaskContainer');
    container.innerHTML += `<label class="subtask"> ${subtask} <input type="checkbox"> </label>`;
    document.getElementById('subtaskInput').value = '';
  }
}

// LADET ALLE KONTAKTE
function loadContacts() {
  let contactsField = document.getElementById('assignedCheckboxContainer');
  contactsField.innerHTML = '';

  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    contactsField.innerHTML += `<label class="label d-none"><input type="checkbox" onchange="handleContactCheckboxChange(this, ${i})"> ${contact['firstName']} ${contact['lastName']} </label>`;
  }
}

// ZEIGT KONTAKTE AN
function showContacts() {
  let labels = document.getElementsByClassName('label');
  let container = document.getElementById('testcontainer');

  if(container.classList.contains('bordernone')){
    container.classList.remove('bordernone')
  } else{
    container.classList.add('bordernone');
  }

  for (let i = 0; i < labels.length; i++) {
    if (labels[i].classList.contains('d-none')) {
      labels[i].classList.remove('d-none');
    } else {
      labels[i].classList.add('d-none');
    }
  }
}

// AN UND AUSKLICKEN VON CHECKBOX ( PUSHT KONTAKT INS ARRAY )
function handleContactCheckboxChange(checkbox, index) {
  let selectedContact = contacts[index];

  if (checkbox.checked) {
    assigned.push(selectedContact);
  } else {
    let contactIndex = assigned.findIndex((contact) => contact === selectedContact);
    assigned.splice(contactIndex, 1);
  }
}

// AKTUALISIERT ARRAY MIT ASSIGNED
function updateAssignedArray(){
  let contactIndex = assigned.findIndex((assignedContact) => assignedContact === contact);
  if (contactIndex !== -1) {
    assigned.splice(contactIndex, 1);
  }
}

// SETZT CHECKBOXEN WIEDER AUF STANDRAD NACH ERSTELLUNG
function resetCheckboxes() {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
}

// ERSTELLT EINZIGARTIGE ID
function generateUniqueId() {
  var timestamp = new Date().getTime();
  var randomNum = Math.floor(Math.random() * 10000);
  var uniqueId = parseInt(timestamp.toString() + randomNum.toString());
  return uniqueId;
}