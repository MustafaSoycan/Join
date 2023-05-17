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
        'image': '<img src="../img/priority-urgent.png">'
    },

    {
        'name': "medium",
        'image': '<img src="../img/priority-medium.png">'
    },

    {
        'name': "low",
        'image': '<img src="../img/priority-low.png">'
    },
]

let contacts= [
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
    <div draggable="true" ondragstart="startDragging(${element['id']})" class="todo">

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
    ${priorities[0]['image']}
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