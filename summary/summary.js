let tasks = []; 

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
    document.getElementById("tasksUrgent").innerHTML = 0 ; 
    document.getElementById("tasksToDo").innerHTML = tasks.filter(task => task.kanban == "to-do").length; 
    document.getElementById("tasksDone").innerHTML = tasks.filter(task => task.kanban == "done").length; 
    document.getElementById("summaryUsername").innerHTML = "My Username" ; 
}

async function getTasksFromLocalStorage(){ /* ACHTUNG: NUR TESTDATEN*/
    tasks = [
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
        {
            'id': 4,
            'title': 'Kochen',
            'description': 'lorem asdfgsatf sadfsadfsaf asfsadfsad asfasfsaf ',
            'kanban': 'in-progress'
        }
    ]
}