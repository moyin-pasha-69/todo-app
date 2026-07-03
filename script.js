document.addEventListener("DOMContentLoaded", () => {
  const inputText = document.getElementById("input-text-box");
  const addTextButton = document.getElementById("add-button");
  const showTasks = document.getElementById("task-stored");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTask(task));

  addTextButton.addEventListener("click", () => {
    let textTask = inputText.value.trim();
    if (textTask == "") return;
    const task = {
      id: Date.now(),
      text: textTask,
      status: false,
    };
    tasks.push(task);
    addTasks();
    renderTask(task);
    inputText.value = "";
  });

  function renderTask(task) {
    let li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.status) li.classList.add("status");
    li.innerHTML = `
    <span>${task.text}</span>
    <button>Delete</button>
    `;
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.status = !task.status;
      li.classList.toggle("status");
      addTasks();
    });
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); //prevent toggle from firing
      tasks = tasks.filter((t) => t.id === task.id);
      li.remove();
      addTasks();
    });
    showTasks.appendChild(li);
  }
  function addTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
