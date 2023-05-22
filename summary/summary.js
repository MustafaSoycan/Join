let tasks = []; 
const taskremoteStorageKey = "board"; 

async function loadTasks(){
    console.log("Tasks werden geladen"); 
    await getTasksFromLocalStorage(); 
    console.log(tasks); 
    setItemValues(); 
}

function setItemValues(){

    document.getElementById("tasksInBoard").innerHTML = tasks.length ; 
    document.getElementById("tasksInProgress").innerHTML = tasks.filter(task => task.kanban == "in-progress").length; 
    document.getElementById("tasksAwaitingFeedback").innerHTML = tasks.filter(task => task.kanban == "awaiting-feedback").length; 
    document.getElementById("tasksUrgent").innerHTML = tasks.filter(task => task.priority == "urgent").length;  ; 
    document.getElementById("tasksToDo").innerHTML = tasks.filter(task => task.kanban == "to-do").length; 
    document.getElementById("tasksDone").innerHTML = tasks.filter(task => task.kanban == "done").length; 
    document.getElementById("summaryUsername").innerHTML = "My Username" ; 
}

async function getTasksFromLocalStorage(){ /* ACHTUNG: NUR TESTDATEN*/
    
        try {
          const response = await getItem(taskremoteStorageKey);
          tasks =  JSON.parse(response);
        } catch (error) {
          console.log(error);
          tasks =  [];
        }
   
}