let tasks = [];

const remoteStorageKeyTest = 'board';
let currentEditingIndex = -1;
let currentDraggedElement;

async function loadBoard() {
  tasks = await getBoardFromRemoteStorage();
  await getContactsFromRemoteStorage();
  updateHTML();
}



// REMOTE STORAGE
async function setBoardToRemoteStorage() {
  try {
    const response = await setItem(remoteStorageKeyTest, JSON.stringify(tasks));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

async function getBoardFromRemoteStorage() {
  try {
    const response = await getItem(remoteStorageKeyTest);
    return JSON.parse(response);
  } catch (error) {
    console.log(error);
    return [];
  }
}



// AKTUALISIERT DIE BOARDS
function updateHTML() {
  showToDoBoard();
  showInProgressBoard();
  showAwaitingFeedbackBoard();
  showDoneBoard();
}


// FILTERT TASKS
function filterTasks() {
  let search = document.getElementById('searchInputField').value.toLowerCase();

  let filteredTasks = tasks.filter(task => {
    const title = task.title.toLowerCase();
    const description = task.description.toLowerCase();
    return title.includes(search) || description.includes(search);
  });
  showFilteredTasks(filteredTasks);
}



// ZEIGT GEFILTERTE TASKS AN
function showFilteredTasks(filteredTasks) {
  document.getElementById('to-do').innerHTML = '';
  document.getElementById('in-progress').innerHTML = '';
  document.getElementById('awaiting-feedback').innerHTML = '';
  document.getElementById('done').innerHTML = '';

  filteredTasks.forEach(task => {
    const element = generateTodoHTML(task);
    const kanban = task.kanban;
    document.getElementById(kanban).innerHTML += element;
  });
}



// ÖFFNET TASK ( HTML TEMPLATE NACHDEM TASK GEÖFFNET IST IN BOARD-TEMPLATE.JS (openTaskHTML) )
function openTask(elementId) {
  let currentTask = document.getElementById('edit-task');
  let content = document.getElementById('content');

  let date = new Date("July 21");

  // Suchen Sie den entsprechenden Task anhand der ID
  const element = tasks.find(task => task.id === elementId);

  // Erstellen Sie den HTML-Code für die Karte mit den Werten des ausgewählten Tasks
  currentTask.innerHTML = ``;
  currentTask.innerHTML = openTaskHTML(element, date);

  currentTask.classList.remove('d-none');
  content.classList.add('blur');
}

function changeSubtaskStatus(elementId, subtask, isChecked) {
  let findtask = tasks.find(task => task.id === elementId); // Suche nach dem Task mit der entsprechenden ID
  let findsubtask = findtask.subtasks.find(task => task === subtask); // Suche nach der Subtask im subtasks-Array des gefundenen Tasks
  let position = findtask.subtasks.indexOf(findsubtask); // Position der Subtask im subtasks-Array des gefundenen Tasks
    
  if (isChecked) {
    findtask.subtaskStatus[position] = true; // Setze den Status der Subtask auf true
  } else {
    findtask.subtaskStatus[position] = false; // Setze den Status der Subtask auf false
  }

  setBoardToRemoteStorage()
  updateHTML()
}




// SCHLIESST TASK
function closeTask() {
  let currentTask = document.getElementById('edit-task');
  currentTask.classList.add('d-none');
  let content = document.getElementById('content');
  content.classList.remove('blur');
}


//  LÖSCHT TASK
function deleteTask(id) {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    setBoardToRemoteStorage();
    closeTask();
    updateHTML();
  }
}


// TASK BEARBEITEN (HTML TEMPLATE ZUM BEARBEITEN IN BOARD-TEMPLATE.JS (editTaskHTML) )
function editTask(id) {
  let currentTask = document.getElementById('edit-task');
  currentTask.innerHTML = '';

  // Suchen Sie den entsprechenden Task anhand der ID
  const element = tasks.find(task => task.id === id);

  currentTask.innerHTML = editTaskHTML(element);

  // Setze den aktuellen Index für die Bearbeitung
  currentEditingIndex = tasks.findIndex(task => task.id === id);
}


function updateAssignedContacts() {
  // Erstelle ein leeres Array, um zugewiesene Kontakte zu speichern
  const assignedContacts = [];
  
  // Wähle alle ausgewählten Checkbox-Elemente aus
  const assignedCheckboxElements = document.querySelectorAll('input[type="checkbox"]:checked');
  
  // Iteriere über jedes ausgewählte Checkbox-Element
  assignedCheckboxElements.forEach((checkbox) => {
      // Extrahiere den Index des Kontakts aus der ID der Checkbox
      const contactIndex = parseInt(checkbox.id.split('-')[1]);
      
      // Füge den entsprechenden Kontakt zum zugewiesenen Kontakte-Array hinzu
      assignedContacts.push(contacts[contactIndex]);
  });
  
  // Aktualisiere die 'assigned'-Eigenschaft des aktuellen bearbeiteten Tasks mit den zugewiesenen Kontakten
  tasks[currentEditingIndex].assigned = assignedContacts;
}

// SPEICHERT ÄNDERUNG NACHDEM TASK BEARBEITET WURDE
function saveChanges() {
  const title = document.getElementById('titleInput').value;
  const description = document.getElementById('descriptionInput').value;
  const dueDate = document.getElementById('dateInput').value;

  // Überprüfe, ob der Index gültig ist
  if (currentEditingIndex >= 0 && currentEditingIndex < tasks.length) {
    tasks[currentEditingIndex].title = title;
    tasks[currentEditingIndex].description = description;
    tasks[currentEditingIndex].dueDate = dueDate;
  }
  updateAssignedContacts();
  setBoardToRemoteStorage();
  updateHTML();
  closeTask();
}



// SETZT PRIORITÄT
function priorityUrgent() {
  document.getElementById('buttonUrgent').classList.add('urgent-background');
  document.getElementById('urgent-image').src = "../img/urgent-symbol.png";
  document.getElementById('buttonMedium').classList.remove('medium-background');
  document.getElementById('medium-image').src = "../img/priority-medium.png";
  document.getElementById('buttonLow').classList.remove('low-background');
  document.getElementById('low-image').src = "../img/priority-low.png";
  tasks[currentEditingIndex].priority = 'urgent';
}

function priorityMedium() {
  document.getElementById('buttonMedium').classList.add('medium-background');
  document.getElementById('medium-image').src = "../img/medium-symbol.svg";
  document.getElementById('buttonUrgent').classList.remove('urgent-background');
  document.getElementById('urgent-image').src = "../img/priority-urgent.png";
  document.getElementById('buttonLow').classList.remove('low-background');
  document.getElementById('low-image').src = "../img/priority-low.png";
  tasks[currentEditingIndex].priority = 'medium';
}

function priorityLow() {
  document.getElementById('buttonLow').classList.add('low-background');
  document.getElementById('low-image').src = "../img/low-symbol.svg";
  document.getElementById('buttonUrgent').classList.remove('urgent-background');
  document.getElementById('urgent-image').src = "../img/priority-urgent.png";
  document.getElementById('buttonMedium').classList.remove('medium-background');
  document.getElementById('medium-image').src = "../img/priority-medium.png";
  tasks[currentEditingIndex].priority = 'low';
}



// DRAG AND DROP
function startDragging(id) {
  currentDraggedElement = tasks.find(task => task.id === id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(kanban) {
  currentDraggedElement['kanban'] = kanban;
  setBoardToRemoteStorage();
  updateHTML();
}

function highlight(id) {
  document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove('drag-area-highlight');
}



// FILTERT BOARDS 
function showToDoBoard() {
  let toDo = tasks.filter(t => t['kanban'] == 'to-do');
  document.getElementById('to-do').innerHTML = '';
  for (let index = 0; index < toDo.length; index++) {
    let element = toDo[index];
    document.getElementById('to-do').innerHTML += generateTodoHTML(element);
  }
}

function showInProgressBoard() {
  let inProgress = tasks.filter(t => t['kanban'] == 'in-progress');
  document.getElementById('in-progress').innerHTML = '';
  for (let index = 0; index < inProgress.length; index++) {
    let element = inProgress[index];
    document.getElementById('in-progress').innerHTML += generateTodoHTML(element);
  }
}

function showAwaitingFeedbackBoard() {
  let awaitingFeedback = tasks.filter(t => t['kanban'] == 'awaiting-feedback');
  document.getElementById('awaiting-feedback').innerHTML = '';
  for (let index = 0; index < awaitingFeedback.length; index++) {
    let element = awaitingFeedback[index];
    document.getElementById('awaiting-feedback').innerHTML += generateTodoHTML(element);
  }
}

function showDoneBoard() {
  let done = tasks.filter(t => t['kanban'] == 'done');
  document.getElementById('done').innerHTML = '';
  for (let index = 0; index < done.length; index++) {
    let element = done[index];
    document.getElementById('done').innerHTML += generateTodoHTML(element);
  }
}