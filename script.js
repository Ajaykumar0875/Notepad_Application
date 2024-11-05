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
    ulTaskContainer.removeChild(taskElement);
    let taskIndex = taskList.findIndex(function(eachTask) {
        let eachTaskId = "Task" + eachTask.uniqueId;
        if (eachTaskId === TaskId) {
            return true;
        } else {
            return false;
        }
    });
    taskList.splice(taskIndex, 1);
    // saveTasks();


}

function addTasks() {
    let userGivenInput = document.getElementById("userInput");
    let userGivenDescription = document.getElementById("inputDescription");
    let userGivenInputValue = userGivenInput.value;
    let userGivenDescriptionValue = userGivenDescription.value;
    taskCount += 1;

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
    createAndAppendTask(newTasksList);
    userGivenInput.value = "";
    userGivenDescription.value = '';

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
    let descriptionElement = document.getElementById(descriptionId);
    let checkboxElement = document.getElementById(checkboxId);
    console.log(checkboxElement.checked);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
    descriptionElement.classList.toggle("checked");
    // if (checkboxElement.checked === true) {
    //     labelElement.classList.add("checked");
    //     descriptionElement.classList.add("checked");
    // } else {
    //     labelElement.classList.remove("checked");
    //     descriptionElement.classList.remove("checked");
    //     descriptionElement.classList.remove("checked");
    // }

    let taskObjectIndex = taskList.findIndex(function(eachTask) {
        eachTaskId = "Task" + eachTask.uniqueId;

        if (eachTaskId === TaskId) {
            return true;
        } else {
            return false;
        }
    });
    let taskObject = taskList[taskObjectIndex];
    // console.log(taskObject);

    if (taskObject.isSelected === true) {
        taskObject.isSelected = false;
    } else {
        taskObject.isSelected = true;
    }
}


function createAndAppendTask(task) {
    let checkboxId = "checkbox" + task.uniqueId;
    let TaskId = "Task" + task.uniqueId;
    let labelId = "label" + task.uniqueId;
    let DescriptionId = "Description" + task.uniqueId;


    let taskElement = document.createElement("li");
    taskElement.id = TaskId;

    ulTaskContainer.appendChild(taskElement);
    taskElement.classList.add("Ul-task-Container", "d-flex", "flex-row");
    taskElement.style.marginTop = "15px";


    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    inputElement.checked = task.isSelected; // <-- Add this line
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
    labelContainer.appendChild(descriptionElement);
    if (task.isSelected === true) {
        descriptionElement.classList.add("checked");
    }


}

for (let task of taskList) {
    createAndAppendTask(task);
}
