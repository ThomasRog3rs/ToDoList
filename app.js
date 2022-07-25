//Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Focus Form on load
taskInput.focus();

// Load all event listners
loadEventListeners();

// Set all event listeners
function loadEventListeners() {
  //DOM Load event
  document.addEventListener("DOMContentLoaded", getTasks);
  //add task event listener
  form.addEventListener("submit", addTask);

  //Remove tast event listener
  taskList.addEventListener("click", removeTast);

  //Clear all tasks event listener
  clearBtn.addEventListener("click", clearTasks);

  //Filter tasks event listener
  filter.addEventListener("keyup", filterTasks);
}

//Get Tasks from Local Storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    // Create li element
    const li = document.createElement("li");

    // Add Class
    li.className = "collection-item";

    //Create Text node and append to the li
    li.appendChild(document.createTextNode(task));

    // OR DO THIS:
    // li.innerText = taskInput.value;

    // Create new link element
    const link = document.createElement("a");

    //Add Class
    link.className = "delete-item secondary-content";

    //Add Icon html
    link.innerHTML = "<i class='fa fa-remove'></i>";

    //Append link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

//Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Input is empty");
    return;
  }

  // Create li element
  const li = document.createElement("li");

  // Add Class
  li.className = "collection-item";

  //Create Text node and append to the li
  li.appendChild(document.createTextNode(taskInput.value));

  // OR DO THIS:
  // li.innerText = taskInput.value;

  // Create new link element
  const link = document.createElement("a");

  //Add Class
  link.className = "delete-item secondary-content";

  //Add Icon html
  link.innerHTML = "<i class='fa fa-remove'></i>";

  //Append link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  //Store in LocalStorage
  storeInLs(taskInput.value);

  //Clear input
  taskInput.value = "";
  taskInput.focus();

  //Prevent Default action
  e.preventDefault();
}

//Add the tast to local strage
function storeInLs(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove Task
function removeTast(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    //Delete the item.
    e.target.parentElement.parentElement.remove();

    //Remove From Local Strage
    removeTaskFromLs(e.target.parentElement.parentElement);
  }
}

function removeTaskFromLs(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Clear All Tasks
function clearTasks(e) {
  // taskList.innerHTML = "";

  // The better way:
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(current) {
    const item = current.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      current.style.display = "block";
    } else {
      current.style.display = "none";
    }
  });
}
