let ulTaskContainer = document.getElementById("ulTaskContainer");
let addBtn = document.getElementById("addBtn");
let saveBtn = document.getElementById("saveBtn");
let taskCount = 0;


function getTaskListFromLocalStorage() {
    let stringifiedList = localStorage.getItem("TaskList");
    let parsedStringifiedList = JSON.parse(stringifiedList);

    if (parsedStringifiedList === null) {
        return [];
    } else {
        return parsedStringifiedList;
    }
}

let taskList = getTaskListFromLocalStorage();



function DeleteTask(TaskId) {
    let taskElement = document.getElementById(TaskId);

    taskElement.classList.add("slide-out");

    setTimeout(function() {
        ulTaskContainer.removeChild(taskElement);

        let taskIndex = taskList.findIndex(function(eachTask) {
            let eachTaskId = "Task" + eachTask.uniqueId;
            return eachTaskId === TaskId;
        });

        if (taskIndex >= 0) {
            taskList.splice(taskIndex, 1);
        }
    }, 500);
}


function addTasks() {
    let userGivenInput = document.getElementById("userInput");
    let userGivenDescription = document.getElementById("inputDescription");
    let userGivenInputValue = userGivenInput.value;
    let userGivenDescriptionValue = userGivenDescription.value;
    taskCount = taskCount + 1;

    if (userGivenInputValue === '') {
        alert("Please enter valid task");
        return;
    }
    if (userGivenDescriptionValue === '') {
        alert("Please enter valid description");
        return;
    }
    let newTasksList = {
        Task: userGivenInputValue,
        Description: userGivenDescriptionValue,
        uniqueId: taskCount,
        isSelected: false,
    };
    taskList.push(newTasksList);
    createAndAppendTask(newTasksList);
    userGivenInput.value = "";
    userGivenDescription.value = '';
    saveTasks();
}

function saveTasks() {
    localStorage.setItem("TaskList", JSON.stringify(taskList));
}

saveBtn.onclick = function() {
    saveTasks();
}

addBtn.onclick = function() {
    addTasks();
}
function onTodoStatusChange(checkboxId, labelId, descriptionId, TaskId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    let descriptionElement = document.getElementById(descriptionId);

    // Toggle the checked class based on checkbox status
    labelElement.classList.toggle("checked", checkboxElement.checked);
    descriptionElement.classList.toggle("checked", checkboxElement.checked);

    // Find the task in the taskList and update its isSelected property
    let taskObjectIndex = taskList.findIndex(function(eachTask) {
        return "Task" + eachTask.uniqueId === TaskId;
    });
    
    if (taskObjectIndex !== -1) {
        taskList[taskObjectIndex].isSelected = checkboxElement.checked;
    }
}


function createAndAppendTask(task) {
    let checkboxId = "checkbox" + task.uniqueId;
    let TaskId = "Task" + task.uniqueId;
    let labelId = "label" + task.uniqueId;
    let DescriptionId = "Description" + task.uniqueId;


    let taskElement = document.createElement("li");
    taskElement.id = TaskId;
    taskElement.classList.add("fade-in");


    ulTaskContainer.appendChild(taskElement);
    taskElement.classList.add("Ul-task-Container", "d-flex", "flex-row");
    taskElement.style.marginTop = "15px";


    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    inputElement.checked = task.isSelected;
    inputElement.style.cursor = "pointer";
    taskElement.appendChild(inputElement);
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, DescriptionId, TaskId);
    };

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container");
    taskElement.appendChild(labelContainer);


    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelContainer.appendChild(labelElement);
    labelElement.textContent = task.Task;
    labelElement.classList.add("label-style");
        labelElement.classList.toggle("checked", task.isSelected); // Add checked class if selected

    if (task.isSelected === true) {
        labelElement.classList.add("checked");
    }


    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.style.cursor = "pointer";
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconContainer.appendChild(deleteIcon);
    deleteIcon.onclick = function() {
        DeleteTask(TaskId);
    };


    let horizontalLine = document.createElement("hr");
    horizontalLine.classList.add("horizontal-line");
    labelContainer.appendChild(horizontalLine);

    let descriptionElement = document.createElement("p");
    descriptionElement.id = DescriptionId;
    descriptionElement.textContent = task.Description;
    descriptionElement.style.marginTop = "-40px";
        descriptionElement.classList.toggle("checked", task.isSelected); // Add checked class if selected

    labelContainer.appendChild(descriptionElement);
    if (task.isSelected === true) {
        descriptionElement.classList.add("checked");
    }


}

for (let task of taskList) {
    createAndAppendTask(task);
}
