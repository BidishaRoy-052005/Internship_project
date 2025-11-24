const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addNewTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addNewTask();
});

function addNewTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }
  addTask(taskText);
  saveTask(taskText);
  taskInput.value = "";
}

function addTask(text, completed = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;
  span.classList.add("task-text");

  li.appendChild(span);
  if (completed) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "✕";
  delBtn.className = "delete";
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.classList.add("fade-out");
    setTimeout(() => {
      li.remove();
      updateLocalStorage();
    }, 300);
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function saveTask(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTask(task.text, task.completed));
}

function updateLocalStorage() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.querySelector(".task-text").textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
