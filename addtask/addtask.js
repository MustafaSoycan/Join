function createTask() {
  let title = document.getElementById('titleInput').value;
  let description = document.getElementById('descriptionInput').value;
  let category = document.getElementById('categoryInput').value;
  let dueDate = document.getElementById('dueDateInput').value;

  let newTask = {
      id: todos.length,
      title: title,
      description: description,
      category: category,
      dueDate: dueDate,
      kanban: 'to-do'
  };

  todos.push(newTask);

  document.getElementById('titleInput').value = '';
  document.getElementById('descriptionInput').value = '';


  setBoardToRemoteStorage();
  updateHTML();
}