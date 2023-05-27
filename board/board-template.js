function generateTodoHTML(element) {
    let contactsHTML = '';
    let remainingCount = 0;

    // Schleife über alle Subtasks und generiere HTML für jede Subtask
    for (let i = 0; i < element['assigned'].length; i++) {
        let contactFirstName = element['assigned'][i]['firstName'];
        let contactFirstNameLetter = contactFirstName.charAt(0);

        let contactLastName = element['assigned'][i]['lastName'];
        let contactLastNameLetter = contactLastName.charAt(0);

        let contactBackground = element['assigned'][i]['bgIconColor'];

        if (i < 3) {
            contactsHTML += `<div class="contactIcon" style="background-color: ${contactBackground};">${contactFirstNameLetter}${contactLastNameLetter}</div>`;
        } else {
            remainingCount++;
        }
    }

    if (remainingCount > 0) {
        contactsHTML += `<div class="contactIcon" style="background-color: black;">+${remainingCount}</div>`;
    }

    let subtaskCount = element['subtasks'].length;
    let completedSubtasks = 0; // Hier muss die Anzahl der erledigten Subtasks für das Element bereitgestellt werden
    let progressPercentage = (completedSubtasks / subtaskCount) * 100;

   

    return `
    <div id="task-${element['id']}" onclick="openTask(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})" class="todo">

    <div class="${element['category']} category">
    ${element['category']}
    </div>

    <div class="title">
    <b>${element['title']} </b>
    </div>

    <div class="description">
    ${element['description']} 
    </div>

    <div class="ladebalken">
    <div class="progress-bar" style="width: ${progressPercentage}%"></div>
    <span id="subtaskCount">${subtaskCount}</span>
    </div>

    <div class="space-between">

    <div class="assigned">
    ${contactsHTML}
    </div>

    <div class="priorities">
    <img src="../img/priority-${element['priority']}.png">
    </div>

    </div>

    </div>`;
}

function openTaskHTML(element) {


    let contactsHTML = '';

    // Schleife über alle Subtasks und generiere HTML für jede Subtask
    for (let i = 0; i < element['assigned'].length; i++) {
        let contactFirstName = element['assigned'][i]['firstName'];
        let contactLastName = element['assigned'][i]['lastName']
        contactsHTML += `
        
          <div class="contactsOnBoard"> ${contactFirstName} ${contactLastName} </div>
        
      `;
    }



    let subtasksHTML = '';

    // Schleife über alle Subtasks und generiere HTML für jede Subtask
    for (let i = 0; i < element['subtasks'].length; i++) {
        let subtask = element['subtasks'][i];
        let checkboxId = `${element['id']}-checkbox-${i}`;
        subtasksHTML += `
          <label>
            <input id="${checkboxId}" type="checkbox" onchange="changeSubtaskStatus(${element['id']}, '${subtask}', this.checked)">
            ${subtask}
          </label>
        `;
      }
      
      
      
      

    return `
    <div class="close-task">
    <img onclick="closeTask()" src="../img/close-task.png">
    </div>
    <div class="${element['category']} category">
    ${element['category']}
    </div>

    <div class="title">
        <h1>${element['title']}</h1>
    </div>

    <div class="description">
        ${element['description']} 
    </div>

    <div class="date">
    <b>Due date:</b>
    ${element['dueDate']}
    </div>

    <div class="priorities">
        <b>Priority:</b> 
        <div class="${element['priority']}">
        ${element['priority']} <img src="../img/${element['priority']}-symbol.svg">
        </div>
    </div>

    <div>

        <div class="assigned-to">
            <b> Assigned to: </b>
        </div>

        <div class="assigned">
            <div class="assigned-name">
            ${contactsHTML}
            </div>
        </div>

        <div class="subtask-list">
        <b> Subtasks: </b>
        <div class="subtask-list-container">
          ${subtasksHTML}
        </div>
        </div>
        </div>

        <div class="delete-edit-buttons">
        <button onclick="deleteTask(${element['id']})" class="delete-button"> </button>
        <button onclick="editTask(${element['id']})" class="edit-button"> <img src="../img/edit.png"> </button>
         </div>
    </div>`;
}


function editTaskHTML(element) {
    
    return `
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
            <input type="date" id="dateInput" value="${element['dueDate']}">
        </div>

        <div class="priority-input">
            Prio
            <div class="edit-task-prio-buttons">
            <button id="buttonUrgent" onclick="priorityUrgent()"> Urgent <img id="urgent-image" src="../img/priority-urgent.png"></button>
            <button id="buttonMedium" onclick="priorityMedium()"> Medium <img id="medium-image" src="../img/priority-medium.png"></button>
            <button id="buttonLow" onclick="priorityLow()"> Low <img id="low-image" src="../img/priority-low.png"></button>
            </div>
        </div>

        <div class="assigned-box">
            <span>Assigned to:</span>
            <div id="assignedCheckboxContainer"></div>
        </div>
        

        <div class="save-changes-button-container">
            <button class="save-changes-button" onclick="saveChanges()"> <span> Ok </span> <img src="../img/checkmark-only-icon.png"> </button>
        </div>
    </div>`;
}


