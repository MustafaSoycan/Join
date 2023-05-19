function generateTodoHTML(element) {
    return `
    <div onclick="openTask(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})" class="todo">

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

function openTaskHTML(element, date){
    return `
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
        <button onclick="editTask(${element['id']})" class="edit-button"> <img src="../img/edit.png"> </button>
         </div>
    </div>`;
}
