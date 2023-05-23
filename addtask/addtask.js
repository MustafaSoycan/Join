async function loadArray() {
  tasks = await getBoardFromRemoteStorage();
}

async function createTask() {
  let title = document.getElementById('titleInput').value;
  let description = document.getElementById('descriptionInput').value;
  let category = document.getElementById('categoryInput').value;
  let dueDate = document.getElementById('dueDateInput').value;
  let assigned = document.getElementById('assignedToInput').value;
  let priority = ''; // Hinzufügen einer leeren Prioritätsvariable

  // Überprüfen, welcher Prioritätsbutton ausgewählt wurde
  if (document.getElementById('buttonUrgent').classList.contains('urgent-background')) {
    priority = 'urgent';
  } else if (document.getElementById('buttonMedium').classList.contains('medium-background')) {
    priority = 'medium';
  } else if (document.getElementById('buttonLow').classList.contains('low-background')) {
    priority = 'low';
  }

  let newTask = {
    id: tasks.length,
    title: title,
    description: description,
    category: category,
    dueDate: dueDate,
    assigned: assigned,
    kanban: 'to-do',
    priority: priority // Festlegen der Priorität
  };

  tasks.push(newTask);

  // Restlicher Code...
  document.getElementById('titleInput').value = '';
  document.getElementById('descriptionInput').value = '';
  document.getElementById('categoryInput').ariaSelected = '';
  document.getElementById('dueDateInput').value = '';
  document.getElementById('assignedToInput').value = '';

  setBoardToRemoteStorage();
}












