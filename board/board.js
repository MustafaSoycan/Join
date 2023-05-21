let todos = [
    {
        'id': 0,
        'title': 'Putzen',
        'description': 'lorem asdfgsatf sadfsadfsaf asfsadfsad asfasfsaf ',
        'kanban': 'to-do'
    },

    {
        'id': 1,
        'title': 'Kochen',
        'description': 'lorem asdfgsatf sadfsadfsaf asfsadfsad asfasfsaf ',
        'kanban': 'in-progress'
    },

    {
        'id': 2,
        'title': 'Essen',
        'description': 'lorem asdfgsatf sadfsadfsaf asfsadfsad asfasfsaf ',
        'kanban': 'awaiting-feedback'
    },

    {
        'id': 3,
        'title': 'Sport',
        'description': 'lorem asdfgsatf sadfsadfsaf asfsadfsad asfasfsaf ',
        'kanban': 'done'
    },
];

let categories = [
    {
        'name': "Design",
        'backgroundColor': "yellow"
    },

    {
        'name': "Marketing",
        'backgroundColor': "blue"
    },

    {
        'name': "Sales",
        'backgroundColor': "black"
    },

    {
        'name': "Backoffice",
        'backgroundColor': "red"
    },
]

let priorities = [
    {
        'name': "urgent",
        'image': '<img src="../img/priority-urgent.png">',
        'symbol': '<div class="urgent"> Urgent <img class="urgent-symbol" src="../img/urgent-symbol.png"> </div>'
    },

    {
        'name': "medium",
        'image': '<img src="../img/priority-medium.png">',
        'symbol': '<div class="urgent"> Medium <img src="../img/medium-symbol.png"> </div>'
    },

    {
        'name': "low",
        'image': '<img src="../img/priority-low.png">',
        'symbol': '<div class="urgent"> Low <img src="../img/low-symbol.png"> </div>'
    },
]

let contacts = [
    {
        'name': "Mustafa Soycan",
        'avatar': '<div class="avatar-mustafa"> MS </div>'
    },

    {
        'name': "Hao Truong",
        'avatar': '<div class="avatar-hao"> HT </div>'
    },

    {
        'name': "Matthias Plank",
        'avatar': '<div class="avatar-matthias"> MP </div>'
    },
]
let currentEditingIndex = -1;
let currentDraggedElement;

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
        const element = toDo[index];
        document.getElementById('to-do').innerHTML += generateTodoHTML(element);
    }
}

function showInProgressBoard() {
    let inProgress = todos.filter(t => t['kanban'] == 'in-progress');
    document.getElementById('in-progress').innerHTML = '';
    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        document.getElementById('in-progress').innerHTML += generateTodoHTML(element);
    }
}

function showAwaitingFeedbackBoard() {
    let awaitingFeedback = todos.filter(t => t['kanban'] == 'awaiting-feedback');
    document.getElementById('awaiting-feedback').innerHTML = '';
    for (let index = 0; index < awaitingFeedback.length; index++) {
        const element = awaitingFeedback[index];
        document.getElementById('awaiting-feedback').innerHTML += generateTodoHTML(element);
    }
}

function showDoneBoard() {
    let done = todos.filter(t => t['kanban'] == 'done');
    document.getElementById('done').innerHTML = '';
    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').innerHTML += generateTodoHTML(element);
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(kanban) {
    todos[currentDraggedElement]['kanban'] = kanban; // Z.B. Todo mit id 1: Das Feld 'category' ändert sich zu zb 'closed'
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

    currentTask.innerHTML = `
        <div class="edit-container">
            <div class="title-input">
                Title
                <input id="titleInput" value="${element['title']}">
            </div>
        
            <div class="description-input">
                Description
                <input id="descriptionInput" value="${element['description']}">
            </div>

            <div class="date-input">
                Date
                <input type="date" id="dateInput" value="${element['date']}">
            </div>

            <div class="priority-input">
                Prio
                <div class="edit-task-prio-buttons">
                <button id="buttonUrgent" onclick="priorityUrgent()"> Urgent <img id="urgent-image" src="../img/priority-urgent.png"></button>
                <button id="buttonMedium" onclick="priorityMedium()"> Medium <img id="medium-image" src="../img/priority-medium.png"></button>
                <button id="buttonLow" onclick="priorityLow()"> Low <img id="low-image" src="../img/priority-low.png"></button>
                </div>
            </div>

            <div class="assigned-input">
                Assigned to
                <select id="assignedSelect">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
            </div>

            <div class="save-changes-button-container">
                <button class="save-changes-button" onclick="saveChanges()"> <span> Ok </span> <img src="../img/checkmark-only-icon.png"> </button>
            </div>
        </div>`;

    // Setze den aktuellen Index für die Bearbeitung
    currentEditingIndex = todos.findIndex(task => task.id === id);
}

function saveChanges() {
    const title = document.getElementById('titleInput').value;
    const description = document.getElementById('descriptionInput').value;

    // Überprüfe, ob der Index gültig ist
    if (currentEditingIndex >= 0 && currentEditingIndex < todos.length) {
        todos[currentEditingIndex].title = title;
        todos[currentEditingIndex].description = description;
    }

    // Aktualisiere das HTML
    updateHTML();

    // Schließe das Bearbeitungsfenster
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