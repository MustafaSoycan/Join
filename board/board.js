let todos = [
    {
        'id': 0,
        'title': 'Putzen',
        'description': 'lorem asdfgsatf sadfsadfsaf asfsadfsad asfasfsaf ',
        'kanban': 'to-do',
        'category':'design',
        'priority': 'urgent',
        'dueDate': '03-04-2023',
        'assigned': 'Mustafa Soycan'
    },

];

const remoteStorageKey = 'board';
let currentEditingIndex = -1;
let currentDraggedElement;

async function loadBoard() {
    todos = await getBoardFromRemoteStorage();
    updateHTML();
  }

async function setBoardToRemoteStorage() {
    try {
      const response = await setItem(remoteStorageKey, JSON.stringify(todos));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function getBoardFromRemoteStorage() {
    try {
      const response = await getItem(remoteStorageKey);
      return JSON.parse(response);
    } catch (error) {
      console.log(error);
      return [];
    }
  }


function updateHTML() {
    showToDoBoard();
    showInProgressBoard();
    showAwaitingFeedbackBoard();
    showDoneBoard();
}


function startDragging(id) {
    currentDraggedElement = id;
}

function showToDoBoard() {
    let toDo = todos.filter(t => t['kanban'] == 'to-do');
    document.getElementById('to-do').innerHTML = '';
    for (let index = 0; index < toDo.length; index++) {
        let element = toDo[index];
        document.getElementById('to-do').innerHTML += generateTodoHTML(element);
    }
}

function showInProgressBoard() {
    let inProgress = todos.filter(t => t['kanban'] == 'in-progress');
    document.getElementById('in-progress').innerHTML = '';
    for (let index = 0; index < inProgress.length; index++) {
        let element = inProgress[index];
        document.getElementById('in-progress').innerHTML += generateTodoHTML(element);
    }
}

function showAwaitingFeedbackBoard() {
    let awaitingFeedback = todos.filter(t => t['kanban'] == 'awaiting-feedback');
    document.getElementById('awaiting-feedback').innerHTML = '';
    for (let index = 0; index < awaitingFeedback.length; index++) {
        let element = awaitingFeedback[index];
        document.getElementById('awaiting-feedback').innerHTML += generateTodoHTML(element);
    }
}

function showDoneBoard() {
    let done = todos.filter(t => t['kanban'] == 'done');
    document.getElementById('done').innerHTML = '';
    for (let index = 0; index < done.length; index++) {
        let element = done[index];
        document.getElementById('done').innerHTML += generateTodoHTML(element);
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(kanban) {
    todos[currentDraggedElement]['kanban'] = kanban; // Z.B. Todo mit id 1: Das Feld 'category' ändert sich zu zb 'closed'
    setBoardToRemoteStorage();
    updateHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

function openTask(elementId) {
    let currentTask = document.getElementById('edit-task');
    let content = document.getElementById('content');

    let date = new Date("July 21");

    // Suchen Sie den entsprechenden Task anhand der ID
    const element = todos.find(task => task.id === elementId);

    // Erstellen Sie den HTML-Code für die Karte mit den Werten des ausgewählten Tasks
    currentTask.innerHTML = ``;
    currentTask.innerHTML = openTaskHTML(element, date);

    currentTask.classList.remove('d-none');
    content.classList.add('blur');
}

function closeTask() {
    let currentTask = document.getElementById('edit-task');
    currentTask.classList.add('d-none');
    let content = document.getElementById('content');
    content.classList.remove('blur');
}

function editTask(id) {
    let currentTask = document.getElementById('edit-task');
    currentTask.innerHTML = '';

    // Suchen Sie den entsprechenden Task anhand der ID
    const element = todos.find(task => task.id === id);

    currentTask.innerHTML = editTaskHTML(element);

    // Setze den aktuellen Index für die Bearbeitung
    currentEditingIndex = todos.findIndex(task => task.id === id);
}


function saveChanges() {
    const title = document.getElementById('titleInput').value;
    const description = document.getElementById('descriptionInput').value;
    const dueDate = document.getElementById('dateInput').value;
    const assigned = document.getElementById('assignedSelect').value;


    // Überprüfe, ob der Index gültig ist
    if (currentEditingIndex >= 0 && currentEditingIndex < todos.length) {
        todos[currentEditingIndex].title = title;
        todos[currentEditingIndex].description = description;
        todos[currentEditingIndex].dueDate = dueDate;
        todos[currentEditingIndex].assigned = assigned;
    }
    setBoardToRemoteStorage();
    updateHTML();
    closeTask();
}

function priorityUrgent() {
    document.getElementById('buttonUrgent').classList.add('urgent-background');
    document.getElementById('urgent-image').src = "../img/urgent-symbol.png";

    document.getElementById('buttonMedium').classList.remove('medium-background');
    document.getElementById('medium-image').src = "../img/priority-medium.png";

    document.getElementById('buttonLow').classList.remove('low-background');
    document.getElementById('low-image').src = "../img/priority-low.png";

    // Aktualisiere die Priorität im todos Array
    todos[currentEditingIndex].priority = 'urgent';
}

function priorityMedium() {
    document.getElementById('buttonMedium').classList.add('medium-background');
    document.getElementById('medium-image').src = "../img/medium-symbol.svg";

    document.getElementById('buttonUrgent').classList.remove('urgent-background');
    document.getElementById('urgent-image').src = "../img/priority-urgent.png";

    document.getElementById('buttonLow').classList.remove('low-background');
    document.getElementById('low-image').src = "../img/priority-low.png";

    // Aktualisiere die Priorität im todos Array
    todos[currentEditingIndex].priority = 'medium';
}

function priorityLow() {
    document.getElementById('buttonLow').classList.add('low-background');
    document.getElementById('low-image').src = "../img/low-symbol.svg";

    document.getElementById('buttonUrgent').classList.remove('urgent-background');
    document.getElementById('urgent-image').src = "../img/priority-urgent.png";

    document.getElementById('buttonMedium').classList.remove('medium-background');
    document.getElementById('medium-image').src = "../img/priority-medium.png";

    // Aktualisiere die Priorität im todos Array
    todos[currentEditingIndex].priority = 'low';
}