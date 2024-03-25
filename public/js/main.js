const submit = async (event) => {
  event.preventDefault();

  const taskInput = document.querySelector("#task"),
    priorityInput = document.querySelector("#priority"),
    json = {
      task: taskInput.value,
      priority: priorityInput.value,
      creationdate: new Date().toLocaleString()
    },
    body = JSON.stringify(json);

  const response = await fetch("/submit", {
    method: "POST",
    body
  });

  const text = await response.text();
  console.log("Server response:", text);

  taskInput.value = "";
  priorityInput.value = "";

  loadData(); 
};

const loadData = async () => {
  const response = await fetch("/getdata");
  const data = await response.json();
  displayData(data);
};

;

const deleteTask = async (taskIndex) => {
  const response = await fetch("/delete", {
    method: "POST",
    body: JSON.stringify({ index: taskIndex, action: "delete" }) 
  });
  const text = await response.text();
  console.log("Server response:", text);

  const tableBody = document.querySelector("#todo-table-body");
  tableBody.deleteRow(taskIndex);

  loadData();
};


const createDeleteButton = (taskIndex) => {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => deleteTask(taskIndex);
  return deleteButton;
};

const displayData = (data) => {
  const tableBody = document.querySelector("#todo-table-body");
  tableBody.innerHTML = "";

  data.forEach((item, index) => {
    const row = tableBody.insertRow();
    row.insertCell().textContent = item.task;
    row.insertCell().textContent = item.priority;
    row.insertCell().textContent = item.creationdate;
    row.insertCell().textContent = item.deadline;
    const deleteCell = row.insertCell(); 
    deleteCell.appendChild(createDeleteButton(index)); 
  });
};



window.onload = () => {
  const submitButton = document.querySelector("button");
  submitButton.onclick = submit;

  loadData(); 
};

