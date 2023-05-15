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


let currentDraggedElement;

function updateHTML(){

    let toDo = todos.filter(t => t['kanban'] == 'to-do');
    document.getElementById('to-do').innerHTML = '';
    for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        document.getElementById('to-do').innerHTML += generateTodoHTML(element);
    }

    let inProgress = todos.filter(t => t['kanban'] == 'in-progress');
    document.getElementById('in-progress').innerHTML = '';
    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        document.getElementById('in-progress').innerHTML += generateTodoHTML(element);
    }

    let awaitingFeedback = todos.filter(t => t['kanban'] == 'awaiting-feedback');
    document.getElementById('awaiting-feedback').innerHTML = '';
    for (let index = 0; index < awaitingFeedback.length; index++) {
        const element = awaitingFeedback[index];
        document.getElementById('awaiting-feedback').innerHTML += generateTodoHTML(element);
    }


    let done = todos.filter(t => t['kanban'] == 'done');
    document.getElementById('done').innerHTML = '';
    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').innerHTML += generateTodoHTML(element);
    }
}

function startDragging(id){
    currentDraggedElement = id;
    }
    

function generateTodoHTML(element){
    return `
    <div draggable="true" ondragstart="startDragging(${element['id']})" class="todo">
    <h3> ${element['title']} </h3>
    ${element['description']} 
    </div>`;
}

function allowDrop(ev) {
    ev.preventDefault();
  }

  function moveTo(kanban){
    todos[currentDraggedElement]['kanban'] = kanban; // Z.B. Todo mit id 1: Das Feld 'category' ändert sich zu zb 'closed'
    updateHTML();
  }