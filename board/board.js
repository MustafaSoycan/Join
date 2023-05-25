let tasks = [];

const remoteStorageKeyTest = 'board';
let currentEditingIndex = -1;
let currentDraggedElement;

async function loadBoard() {
    tasks = await getBoardFromRemoteStorage();
    updateHTML();
    updateTaskCount();
  }

  function updateTaskCount() {
    const taskCount = tasks.length; // Hier die Anzahl der Tasks aus dem tasks Array erhalten
    const taskCountElement = document.querySelector('.task-count');
    taskCountElement.textContent = taskCount;
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

  function deleteTask(id) {
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      setBoardToRemoteStorage();
      closeTask();
      updateHTML();
    }
  }

function updateHTML() {
    showToDoBoard();
    showInProgressBoard();
    showAwaitingFeedbackBoard();
    showDoneBoard();
}





// FILTER TASKS
function filterTasks() {
  let search = document.getElementById('searchInputField').value.toLowerCase();
  
  let filteredTasks = tasks.filter(task => {
    const title = task.title.toLowerCase();
    const description = task.description.toLowerCase();
    return title.includes(search) || description.includes(search);
  });
  showFilteredTasks(filteredTasks);
}



// OPEN TAKS
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

// CLOSE TASK
function closeTask() {
    let currentTask = document.getElementById('edit-task');
    currentTask.classList.add('d-none');
    let content = document.getElementById('content');
    content.classList.remove('blur');
}

// EDIT TASK
function editTask(id) {
    let currentTask = document.getElementById('edit-task');
    currentTask.innerHTML = '';

    // Suchen Sie den entsprechenden Task anhand der ID
    const element = tasks.find(task => task.id === id);

    currentTask.innerHTML = editTaskHTML(element);

    // Setze den aktuellen Index für die Bearbeitung
    currentEditingIndex = tasks.findIndex(task => task.id === id);
}

// SAVE EDITS 
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
    setBoardToRemoteStorage();
    updateHTML();
    closeTask();
}



// PRIORITY BUTTONS
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




// FILTER BOARDS 
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