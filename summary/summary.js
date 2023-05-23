let tasks = []; 
const taskremoteStorageKey = "board"; 

async function loadTasks(){
    console.log("Tasks werden geladen"); 
    await getTasksFromLocalStorage(); 
    console.log(tasks); 
    setItemValues(); 
    LogInCheck()

}

function setItemValues(){

    document.getElementById("tasksInBoard").innerHTML = tasks.length ; 
    document.getElementById("tasksInProgress").innerHTML = tasks.filter(task => task.kanban == "in-progress").length; 
    document.getElementById("tasksAwaitingFeedback").innerHTML = tasks.filter(task => task.kanban == "awaiting-feedback").length; 
    document.getElementById("tasksUrgent").innerHTML = tasks.filter(task => task.priority == "urgent").length;  
    document.getElementById("taskUrgentDate").innerHTML = getNextUrgentDate();  
 
    document.getElementById("tasksToDo").innerHTML = tasks.filter(task => task.kanban == "to-do").length; 
    document.getElementById("tasksDone").innerHTML = tasks.filter(task => task.kanban == "done").length; 
}

function LogInCheck(){
  if (localStorage.getItem('username')) {
    let username = localStorage.getItem('username');
    document.getElementById("summaryUsername").innerHTML = username  ; 
  } else {
    document.getElementById("summaryUsername").innerHTML = 'Guest'
  }
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

function getNextUrgentDate(){

  let urgent = tasks.filter(task => task.priority == "urgent"); 
  console.log(urgent);
  if ( urgent.length > 0 ) {
    urgent = urgent.sort (function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
    return urgent[0].dueDate; 
  }
  else {
    return "No urgent task"; 
  }

 
}