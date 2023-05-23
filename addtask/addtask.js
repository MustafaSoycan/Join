

async function loadArray() {
  tasks = await getBoardFromRemoteStorage();
  await getContactsFromRemoteStorage();
  await showContacts();
}



async function createTask() {
  let title = document.getElementById('titleInput').value;
  let description = document.getElementById('descriptionInput').value;
  let category = document.getElementById('categoryInput').value;
  let assigned = document.getElementById('assignedInput').value;
  let dueDate = document.getElementById('dueDateInput').value;
  let priority = ''; // Hinzufügen einer leeren Prioritätsvariable


  // Überprüfen, welcher Prioritätsbutton ausgewählt wurde
  if (document.getElementById('buttonUrgent').classList.contains('urgent-background')) {
    priority = 'urgent';
  } else if (document.getElementById('buttonMedium').classList.contains('medium-background')) {
    priority = 'medium';
  } else if (document.getElementById('buttonLow').classList.contains('low-background')) {
    priority = 'low';
  }

 

  let subtasks = []; // Neues Array für Subtasks

   // Schleife über alle Subtask-Elemente und füge sie dem Subtasks-Array hinzu
   let subtaskElements = document.getElementsByClassName('subtask');
   for (let i = 0; i < subtaskElements.length; i++) {
     let subtask = subtaskElements[i].innerText.trim();
     subtasks.push(subtask);
   }



   let newTask = {
    id: tasks.length,
    title: title,
    description: description,
    category: category,
    dueDate: dueDate,
    assigned: assigned,
    kanban: 'to-do',
    priority: priority, // Festlegen der Priorität
    subtasks: subtasks // Hinzufügen der Subtasks zum newTask-Objekt
  };

  tasks.push(newTask);

  // Restlicher Code...
  document.getElementById('titleInput').value = '';
  document.getElementById('descriptionInput').value = '';
  document.getElementById('categoryInput').value = '';
  document.getElementById('dueDateInput').value = '';
  document.getElementById('assignedInput').value = '';
  

  setBoardToRemoteStorage();
}


function addSubtask(){
  let subtask = document.getElementById('subtaskInput').value;
  
  let container = document.getElementById('subtaskContainer');

  container.innerHTML += `<label class="subtask"> ${subtask} <input type="checkbox"> </label>`;

  document.getElementById('subtaskInput').value = '';

}



function showContacts() {
  
  let contactsField = document.getElementById('assignedInput');
  contactsField.innerHTML = '';

  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    contactsField.innerHTML += `<option class="${i}"> ${contact['firstName']} ${contact['lastName']} </option> <input type="checkbox"> `;
  }
}