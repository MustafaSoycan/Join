function createTask() {
    const title = document.getElementById('titleInput').value;
    const description = document.getElementById('descriptionInput').value;
    
  
    const newTask = {
      id: todos.length, // Weise eine eindeutige ID basierend auf der Anzahl der vorhandenen Tasks zu
      title: title,
      description: description,
      kanban: 'to-do' // Setze den kanban-Wert auf den Standardwert
    };
  
    todos.push(newTask); // Füge den neuen Task zum todos-Array hinzu
  
    document.getElementById('titleInput').value = '';
    document.getElementById('descriptionInput').value = '';

    updateHTML();
  }

