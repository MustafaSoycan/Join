/**
 * Das Array mit den Aufgaben.
 * @type {Array}
 */
let tasks = [];


/**
 * Der Schlüssel zum Speichern im Remote Storage.
 * @type {string}
 */
const remoteStorageKeyTest = 'board';


/**
 * Der aktuelle Index der Aufgabe für die Bearbeitung.
 * @type {number}
 */
let currentEditingIndex = -1;


/**
 * Das aktuelle gezogene Element.
 * @type {object}
 */
let currentDraggedElement;


/**
 * Lädt alle Aufgaben und Kontakte aus dem Remote Storage und zeigt sie im HTML an.
 * 
 */
async function loadBoard() {
  tasks = await getBoardFromRemoteStorage();
  await getContactsFromRemoteStorage();
  updateHTML();
}


/**
 * Speichert die Aufgaben im Remote Storage.
 * 
 */
async function setBoardToRemoteStorage() {
  try {
    const response = await setItem(remoteStorageKeyTest, JSON.stringify(tasks));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}


/**
 * Lädt die Aufgaben aus dem Remote Storage.
 *
 */
async function getBoardFromRemoteStorage() {
  try {
    const response = await getItem(remoteStorageKeyTest);
    return JSON.parse(response);
  } catch (error) {
    console.log(error);
    return [];
  }
}


/**
 * Aktualisiert das HTML der verschiedenen Boards mit den Aufgaben.
 */
function updateHTML() {
  showToDoBoard();
  showInProgressBoard();
  showAwaitingFeedbackBoard();
  showDoneBoard();
}


/**
 * Filtert die Aufgaben, wenn etwas in das Suchfeld eingegeben wird.
 */
function filterTasks() {
  /**
   * Der Suchbegriff.
   * @type {string}
   */
  let search = document.getElementById('searchInputField').value.toLowerCase();

  /**
   * Die gefilterten Aufgaben.
   * @type {Array}
   */
  let filteredTasks = tasks.filter(task => {
    const title = task.title.toLowerCase();
    const description = task.description.toLowerCase();
    return title.includes(search) || description.includes(search);
  });
  showFilteredTasks(filteredTasks);
}


/**
 * Zeigt die gefilterten Aufgaben im jeweiligen Board an.
 * @param {Array} filteredTasks - Die gefilterten Aufgaben.
 */
function showFilteredTasks(filteredTasks) {
  document.getElementById('to-do').innerHTML = '';
  document.getElementById('in-progress').innerHTML = '';
  document.getElementById('awaiting-feedback').innerHTML = '';
  document.getElementById('done').innerHTML = '';

  filteredTasks.forEach(task => {
    const element = generateTodoHTML(task);
    const kanban = task.kanban;
    document.getElementById(kanban).innerHTML += element;
  });
}


/**
 * Öffnet die ausgewählte Aufgabe und zeigt diese in HTML an.
 * @param {string} elementId - Die ID des Elements.
 */
function openTask(elementId) {
  let currentTask = document.getElementById('edit-task');
  let kanban = document.getElementById('kanban-board');

  let date = new Date("July 21");

  // Suchen Sie den entsprechenden Task anhand der ID
  const element = tasks.find(task => task.id === elementId);

  // Erstellen Sie den HTML-Code für die Karte mit den Werten des ausgewählten Tasks
  currentTask.innerHTML = ``;
  currentTask.innerHTML = openTaskHTML(element, date);

  currentTask.classList.remove('d-none');
  kanban.classList.add('blur');
}


/**
 * Ändert den Status einer Teilaufgabe.
 * @param {string} elementId - Die ID des Elements.
 * @param {string} subtask - Die Teilaufgabe.
 * @param {boolean} isChecked - Der ausgewählte Status.
 */
function changeSubtaskStatus(elementId, subtask, isChecked) {
  let findtask = tasks.find(task => task.id === elementId); // Suche nach dem Task mit der entsprechenden ID
  let findsubtask = findtask.subtasks.find(task => task === subtask); // Suche nach der Subtask im subtasks-Array des gefundenen Tasks
  let position = findtask.subtasks.indexOf(findsubtask); // Position der Subtask im subtasks-Array des gefundenen Tasks

  if (isChecked) {
    findtask.subtaskStatus[position] = true; // Setze den Status der Subtask auf true
  } else {
    findtask.subtaskStatus[position] = false; // Setze den Status der Subtask auf false
  }

  setBoardToRemoteStorage();
  updateHTML();
}


/**
 * Schließt die geöffnete Aufgabe.
 */
function closeTask() {
  let currentTask = document.getElementById('edit-task');
  currentTask.classList.add('d-none');
  let kanban = document.getElementById('kanban-board');
  kanban.classList.remove('blur');
}


/**
 * Löscht die ausgewählte Aufgabe.
 * @param {string} id - Die ID der Aufgabe.
 */
function deleteTask(id) {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    setBoardToRemoteStorage();
    closeTask();
    updateHTML();
  }
}


/**
 * Die Möglichkeit, eine Aufgabe zu bearbeiten.
 * @param {string} id - Die ID der Aufgabe.
 */
function editTask(id) {
  let currentTask = document.getElementById('edit-task');
  currentTask.innerHTML = '';

  // Suchen Sie den entsprechenden Task anhand der ID
  const element = tasks.find(task => task.id === id);

  currentTask.innerHTML = editTaskHTML(element);

  // Setze den aktuellen Index für die Bearbeitung
  currentEditingIndex = tasks.findIndex(task => task.id === id);
}


/**
 * Das Zuweisen der Kontakte für die jeweilige Aufgabe.
 */
function updateAssignedContacts() {
  // Erstelle ein leeres Array, um zugewiesene Kontakte zu speichern
  const assignedContacts = [];

  // Wähle alle ausgewählten Checkbox-Elemente aus
  const assignedCheckboxElements = document.querySelectorAll('input[type="checkbox"]:checked');

  // Iteriere über jedes ausgewählte Checkbox-Element
  assignedCheckboxElements.forEach((checkbox) => {
    // Extrahiere den Index des Kontakts aus der ID der Checkbox
    const contactIndex = parseInt(checkbox.id.split('-')[1]);

    // Füge den entsprechenden Kontakt zum zugewiesenen Kontakte-Array hinzu
    assignedContacts.push(contacts[contactIndex]);
  });

  // Aktualisiere die 'assigned'-Eigenschaft des aktuellen bearbeiteten Tasks mit den zugewiesenen Kontakten
  tasks[currentEditingIndex].assigned = assignedContacts;
}


/**
 * Speichert die Aufgabe, nachdem sie bearbeitet wurde.
 */
function saveChanges() {
  /**
   * Der Titel der Aufgabe.
   * @type {string}
   */
  const title = document.getElementById('titleInput').value;

  /**
   * Die Beschreibung der Aufgabe.
   * @type {string}
   */
  const description = document.getElementById('descriptionInput').value;

  /**
   * Das Fälligkeitsdatum der Aufgabe.
   * @type {string}
   */
  const dueDate = document.getElementById('dateInput').value;

  // Überprüfe, ob der Index gültig ist
  if (currentEditingIndex >= 0 && currentEditingIndex < tasks.length) {
    tasks[currentEditingIndex].title = title;
    tasks[currentEditingIndex].description = description;
    tasks[currentEditingIndex].dueDate = dueDate;
  }
  updateAssignedContacts();
  setBoardToRemoteStorage();
  updateHTML();
  closeTask();
  savedChangesReport();
}



/**
 * Setzt die Priorität auf "dringend".
 */
function priorityUrgent() {
  document.getElementById('buttonUrgent').classList.add('urgent-background');
  document.getElementById('urgent-image').src = "../img/urgent-symbol.png";
  document.getElementById('buttonMedium').classList.remove('medium-background');
  document.getElementById('medium-image').src = "../img/priority-medium.png";
  document.getElementById('buttonLow').classList.remove('low-background');
  document.getElementById('low-image').src = "../img/priority-low.png";
  tasks[currentEditingIndex].priority = 'urgent';
}


/**
 * Setzt die Priorität auf "mittel".
 */
function priorityMedium() {
  document.getElementById('buttonMedium').classList.add('medium-background');
  document.getElementById('medium-image').src = "../img/medium-symbol.svg";
  document.getElementById('buttonUrgent').classList.remove('urgent-background');
  document.getElementById('urgent-image').src = "../img/priority-urgent.png";
  document.getElementById('buttonLow').classList.remove('low-background');
  document.getElementById('low-image').src = "../img/priority-low.png";
  tasks[currentEditingIndex].priority = 'medium';
}


/**
 * Setzt die Priorität auf "niedrig".
 */
function priorityLow() {
  document.getElementById('buttonLow').classList.add('low-background');
  document.getElementById('low-image').src = "../img/low-symbol.svg";
  document.getElementById('buttonUrgent').classList.remove('urgent-background');
  document.getElementById('urgent-image').src = "../img/priority-urgent.png";
  document.getElementById('buttonMedium').classList.remove('medium-background');
  document.getElementById('medium-image').src = "../img/priority-medium.png";
  tasks[currentEditingIndex].priority = 'low';
}



/**
 * Lässt die Aufgabe für den Drag-and-Drop-Vorgang vorbereitet werden.
 *
 * @param {string} id - Die ID der Aufgabe, die gezogen werden soll.
 */
function startDragging(id) {
  currentDraggedElement = tasks.find(task => task.id === id);
}

/**
 * Erlaubt den Drag-and-Drop-Vorgang.
 *
 * @param {Event} ev - Das Drag-and-Drop-Ereignisobjekt.
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Bewegt die gezogene Aufgabe in ein bestimmtes Kanban-Board.
 *
 * @param {string} kanban - Der Name des Kanban-Boards, in das die Aufgabe verschoben wird.
 */
function moveTo(kanban) {
  currentDraggedElement['kanban'] = kanban;
  setBoardToRemoteStorage();
  updateHTML();
}

/**
 * Hervorhebungsbereich für den Drag-and-Drop-Vorgang.
 *
 * @param {string} id - Die ID des Bereichs, der hervorgehoben werden soll.
 */
function highlight(id) {
  document.getElementById(id).classList.add('drag-area-highlight');
}

/**
 * Entfernt die Hervorhebung des Bereichs nach dem Drag-and-Drop-Vorgang.
 *
 * @param {string} id - Die ID des Bereichs, dessen Hervorhebung entfernt werden soll.
 */
function removeHighlight(id) {
  document.getElementById(id).classList.remove('drag-area-highlight');
}



/**
 * Zeigt alle Aufgaben im 'To Do'-Board an.
 */
function showToDoBoard() {
  let toDo = tasks.filter(t => t['kanban'] == 'to-do');
  document.getElementById('to-do').innerHTML = '';
  for (let index = 0; index < toDo.length; index++) {
    let element = toDo[index];
    document.getElementById('to-do').innerHTML += generateTodoHTML(element);
  }
}

/**
 * Zeigt alle Aufgaben im 'In Progress'-Board an.
 */
function showInProgressBoard() {
  let inProgress = tasks.filter(t => t['kanban'] == 'in-progress');
  document.getElementById('in-progress').innerHTML = '';
  for (let index = 0; index < inProgress.length; index++) {
    let element = inProgress[index];
    document.getElementById('in-progress').innerHTML += generateTodoHTML(element);
  }
}

/**
 * Zeigt alle Aufgaben im 'Awaiting Feedback'-Board an.
 */
function showAwaitingFeedbackBoard() {
  let awaitingFeedback = tasks.filter(t => t['kanban'] == 'awaiting-feedback');
  document.getElementById('awaiting-feedback').innerHTML = '';
  for (let index = 0; index < awaitingFeedback.length; index++) {
    let element = awaitingFeedback[index];
    document.getElementById('awaiting-feedback').innerHTML += generateTodoHTML(element);
  }
}

/**
 * Zeigt alle Aufgaben im 'Done'-Board an.
 */
function showDoneBoard() {
  let done = tasks.filter(t => t['kanban'] == 'done');
  document.getElementById('done').innerHTML = '';
  for (let index = 0; index < done.length; index++) {
    let element = done[index];
    document.getElementById('done').innerHTML += generateTodoHTML(element);
  }
}


/**
 * Rückmeldung, dass eine Aufgabe umgeändert wurde.
 */
function savedChangesReport() {
  document.getElementById('savedChanges').classList.remove('d-none');
  setTimeout(() => {
    document.getElementById('savedChanges').classList.add('d-none');
  }, 2000); // Entfernt Meldung wieder nach 2 Sekunden.
}

