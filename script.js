document.addEventListener("DOMContentLoaded", loadTasks);

//function to add task 
function addTask(){
    let taskInput=document.getElementById("taskinput");
    let taskText=taskInput.value.trim();

    if(taskText==""){
        alert("Please enter a text");
        return;
    }

    let taskList=document.getElementById("task-list");

//create a new list
let li=document.createElement("li");
li.innerText=taskText;

//add click event to mark task as completed 
li.addEventListener("click",function(){
    li.classList.toggle("completed");
    saveTask();
});

//create delete button 
let deletebtn=document.createElement("button");
deletebtn.textContent="X";
deletebtn.className="delete-btn";
//add event listener to delete task 
deletebtn.addEventListener("click", function(){
    taskList.removeChild(li);
    saveTask();
});
li.appendChild(deletebtn);
taskList.appendChild(li);

saveTask();

//clear input field 
taskInput.value="";
}

//function to save task 
function saveTask(){
    let tasks=[];
    document.querySelectorAll("#task-list li").forEach(function(li){
        tasks.push({
            text:li.firstChild.textContent,
            completed:li.classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//function to load items from local storage 
function loadTasks(){
    let tasks= JSON.parse(localStorage.getItem("tasks"))||[];
    let taskList=document.getElementById("task-list");

    tasks.forEach(function(task){
        let li=document.createElement("li");
        li.textContent=task.text;

        if(task.completed){
            li.classList.add("completed");
        }
        li.addEventListener("click",function(){
            li.classList.toggle("completed");
            saveTask();
        });
        
        //create delete button 
        let deletebtn=document.createElement("button");
        deletebtn.textContent="X";
        deletebtn.className="delete-btn";

        //add event listener to delete task 
        deletebtn.addEventListener("click", function(){
            taskList.removeChild(li);
            saveTask();
        });

        li.appendChild(deletebtn);
        taskList.appendChild(li);
    });

}

//function to clear all task
function clearAllTask(){
    let taskList=document.getElementById("task-list");
    taskList.innerHTML="";
    localStorage.removeItem("tasks");
} 

