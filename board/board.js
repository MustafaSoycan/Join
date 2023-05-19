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

function generateTodoHTML(element) {

    return `
    <div onclick="editTask(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})" class="todo">

    <div class="${categories[1]['backgroundColor']} category">
    ${categories[1]['name']}
    </div>

    <div class="title">
    <b>${element['title']} </b>
    </div>

    <div class="description">
    ${element['description']} 
    </div>


    <div class="space-between">

    <div  class="assigned">
    ${contacts[0]['avatar']} 
    </div>

    <div class="priorities">
    ${priorities[1]['image']}
    </div>

    </div>

    </div>`;
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

function editTask(elementId) {
    let currentTask = document.getElementById('edit-task');

    let content = document.getElementById('content');

    let date = new Date("July 21");

    // Suchen Sie den entsprechenden Task anhand der ID
    const element = todos.find(task => task.id === elementId);

    // Erstellen Sie den HTML-Code für die Karte mit den Werten des ausgewählten Tasks
    currentTask.innerHTML = ``;
    currentTask.innerHTML = `
        <div class="close-task">
        <img onclick="closeTask()" src="../img/close-task.png">
        </div>
        <div class="${categories[1]['backgroundColor']} category">
            ${categories[1]['name']}
        </div>

        <div class="title">
            <h1>${element['title']}</h1>
        </div>

        <div class="description">
            ${element['description']} 
        </div>

        <div class="date">
        <b>Due date:</b>
        ${date}
        </div>

        <div class="priorities">
            <b>Priority:</b> ${priorities[0]['symbol']}
        </div>

        <div>

              <div class="assigned-to">
                <b> Assigned to: </b>
                </div>

            <div class="assigned">
                <div class="assigned-avatar">
                ${contacts[0]['avatar']}
                </div>

                <div class="assigned-name">
                 ${contacts[0]['name']}
                 </div>
            </div>

            <div class="delete-edit-buttons">
            <button class="delete-button"> </button>
            <button class="edit-button"> <img src="../img/edit.png"> </button>
             </div>
        </div>`;

    currentTask.classList.remove('d-none');
    content.classList.add('blur');
}

function closeTask() {
    let currentTask = document.getElementById('edit-task');

    currentTask.classList.add('d-none');

    let content = document.getElementById('content');
    content.classList.remove('blur');
}