let assigned = []; // Neues Array für zugewiesene Kontakte

async function loadArray() {
  tasks = await getBoardFromRemoteStorage();
  await getContactsFromRemoteStorage();
  await showContacts();
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
  let subtaskElements = document.getElementsByClassName('subtask');
  for (let i = 0; i < subtaskElements.length; i++) {
    let subtask = subtaskElements[i].innerText.trim();
    subtasks.push(subtask);
  }

  let newTask = {
    id: generateUniqueId(),
    title: title,
    description: description,
    category: category,
    dueDate: dueDate,
    assigned: assigned,
    kanban: 'to-do',
    priority: priority,
    subtasks: subtasks
  };

  tasks.push(newTask);

  document.getElementById('titleInput').value = '';
  document.getElementById('descriptionInput').value = '';
  document.getElementById('categoryInput').value = '';
  document.getElementById('dueDateInput').value = '';
  
  document.getElementById('assignedContacts').innerHTML = '';


   // Deaktiviere die Prioritätsbuttons
   document.getElementById('buttonUrgent').classList.remove('urgent-background');
   document.getElementById('buttonMedium').classList.remove('medium-background');
   document.getElementById('buttonLow').classList.remove('low-background');

  resetCheckboxes(); // Checkboxen zurücksetzen
  setBoardToRemoteStorage();

   // Anzeigen der Erfolgsmeldung
   document.getElementById('successMessage').classList.remove('d-none');

   // Weiterleitung zur Board-Ansicht
   setTimeout(function() {
     window.location.href = '../board/board.html';
   }, 1500); // Warte 3 Sekunden, bevor zur Board-Ansicht weitergeleitet wird

}

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

function showContacts() {
  let contactsField = document.getElementById('assignedCheckboxContainer');
  contactsField.innerHTML = '';

  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    contactsField.innerHTML += `<label><input type="checkbox" onchange="handleContactCheckboxChange(this, ${i})"> ${contact['firstName']} ${contact['lastName']} </label>`;
  }
}

function handleContactCheckboxChange(checkbox, index) {
  let selectedContact = contacts[index];

  if (checkbox.checked) {
    assigned.push(selectedContact);
    addAssignedContactElement(selectedContact);
  } else {
    let contactIndex = assigned.findIndex((contact) => contact === selectedContact);
    assigned.splice(contactIndex, 1);
    removeAssignedContactElement(selectedContact);
  }
}

/*/function addAssignedContactElement(contact) {
  let assignedContactsContainer = document.getElementById('assignedContacts');
  let firstNameFirstLetter = contact.firstName.charAt(0);
  let lastNameFirstLetter = contact.lastName.charAt(0);
  let backgroundColor = contact.bgIconColor;
  assignedContactsContainer.innerHTML += `
    <div class="contact-list-container">
        <div class="contactIcon" style="background-color: ${backgroundColor}">
            ${firstNameFirstLetter}${lastNameFirstLetter} 
        </div> 

    </div>`;
}/*/

function removeAssignedContactElement(contact) {
  let assignedContactsContainer = document.getElementById('assignedContacts');
  let assignedContactElements = assignedContactsContainer.getElementsByClassName('contact-list-container');

  for (let i = 0; i < assignedContactElements.length; i++) {
    let assignedContactElement = assignedContactElements[i];
    let assignedContactName = assignedContactElement.innerText.trim();

    if (assignedContactName === `${contact.firstName} ${contact.lastName}`) {
      assignedContactElement.remove();
      break;
    }
  }

  // Aktualisiere das "assigned" Array, um den Kontakt zu entfernen
  let contactIndex = assigned.findIndex((assignedContact) => assignedContact === contact);
  if (contactIndex !== -1) {
    assigned.splice(contactIndex, 1);
  }
}

function resetCheckboxes() {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
}

function generateUniqueId() {
  var timestamp = new Date().getTime();
  var randomNum = Math.floor(Math.random() * 10000);
  var uniqueId = parseInt(timestamp.toString() + randomNum.toString());

  return uniqueId;
}