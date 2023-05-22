async function loadArray(){
tasks = await getBoardFromRemoteStorage();
}

async function createTask() {
  
  let title = document.getElementById('titleInput').value;
  let description = document.getElementById('descriptionInput').value;
  let category = document.getElementById('categoryInput').value;
  let dueDate = document.getElementById('dueDateInput').value;
  let assigned = document.getElementById('assignedToInput').value;


  let newTask = {
      id: tasks.length,
      title: title,
      description: description,
      category: category,
      dueDate: dueDate,
      assigned: assigned,
      kanban: 'to-do'
  };

  tasks.push(newTask);

  document.getElementById('titleInput').value = '';
  document.getElementById('descriptionInput').value = '';
  document.getElementById('categoryInput').ariaSelected = '';
  document.getElementById('dueDateInput').value = '';
  document.getElementById('assignedToInput').value = '';
 

  setBoardToRemoteStorage();

}
