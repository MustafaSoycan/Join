let todos = [
    {
        'id': 0,
        'title': 'Putzen',
        'description': 'lorem asdfgsatf sadfsadfsaf asfsadfsad asfasfsaf ',
        'category': 'Design',
        'priority': 'Urgent',
        'kanban': 'to-do'
    },

    {
        'id': 1,
        'title': 'Kochen',
        'description': 'lorem asdfgsatf sadfsadfsaf asfsadfsad asfasfsaf ',
        'category': 'Backoffice',
        'priority': 'Medium',
        'kanban': 'in-progress'
    },

    {
        'id': 2,
        'title': 'Essen',
        'description': 'lorem asdfgsatf sadfsadfsaf asfsadfsad asfasfsaf ',
        'category': 'Sales',
        'priority': 'Low',
        'kanban': 'awaiting-feedback'
    },

    {
        'id': 3,
        'title': 'Sport',
        'description': 'lorem asdfgsatf sadfsadfsaf asfsadfsad asfasfsaf ',
        'category': 'Marketing',
        'priority': 'Urgent',
        'kanban': 'done'
    },
];


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

    <div id="${element['category']}" class="category">
    ${element['category']} 
    </div>

    <div class="title">
    <b>${element['title']} </b>
    </div>

    <div class="description">
    ${element['description']} 
    </div>

    <div id="${element['priority']}" class="priority">
    ${element['priority']} 
    </div>

    </div>`;

}



function showToDoBoard() {
    let toDo = todos.filter(t => t['kanban'] == 'to-do');
    document.getElementById('to-do').innerHTML = '';
    for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        document.getElementById('to-do').innerHTML += generateTodoHTML(element);
        checkCategory(element);
        checkPriority(element);
    }
}

function showInProgressBoard() {
    let inProgress = todos.filter(t => t['kanban'] == 'in-progress');
    document.getElementById('in-progress').innerHTML = '';
    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        document.getElementById('in-progress').innerHTML += generateTodoHTML(element);
        checkCategory(element);
        checkPriority(element);
    }
}

function showAwaitingFeedbackBoard() {
    let awaitingFeedback = todos.filter(t => t['kanban'] == 'awaiting-feedback');
    document.getElementById('awaiting-feedback').innerHTML = '';
    for (let index = 0; index < awaitingFeedback.length; index++) {
        const element = awaitingFeedback[index];
        document.getElementById('awaiting-feedback').innerHTML += generateTodoHTML(element);
        checkCategory(element);
        checkPriority(element);
    }
}

function showDoneBoard() {
    let done = todos.filter(t => t['kanban'] == 'done');
    document.getElementById('done').innerHTML = '';
    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').innerHTML += generateTodoHTML(element);
        checkCategory(element);
        checkPriority(element);
    }
}


function checkPriority(element) {
    if (element['priority'] == 'Urgent') {
        document.getElementById('Urgent').innerHTML = `<img src="../img/priority-urgent.png">`;
    }

    if (element['priority'] == 'Medium') {
        document.getElementById('Medium').innerHTML = `<img src="../img/priority-medium.png">`;
    }

    if (element['priority'] == 'Low') {
        document.getElementById('Low').innerHTML = `<img src="../img/priority-low.png">`;
    }
}

function checkCategory(element) {
    if (element['category'] == 'Design') {
        document.getElementById('Design').classList.add('design');
    }

    if (element['category'] == 'Backoffice') {
        document.getElementById('Backoffice').classList.add('backoffice');
    }

    if (element['category'] == 'Sales') {
        document.getElementById('Sales').classList.add('sales');
    }

    if (element['category'] == 'Marketing') {
        document.getElementById('Marketing').classList.add('marketing');
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