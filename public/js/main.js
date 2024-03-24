
window.onload = function () {
  const form = document.getElementById("input-form");
  form.onsubmit = submit;
  const [today] = new Date().toISOString().split('T')

  const dateInput = document.getElementById('calendar');
  dateInput.setAttribute('min', today);
  dateInput.setAttribute('value', today);
}

const submit = async function (event) {
  event.preventDefault()
  const form = document.getElementById("input-form")
  if (form.checkValidity()) {

    const input = document.getElementById("task-input").value
    const dueDate = document.getElementById("calendar").value
    const json = { "task": input, "creationDate": new Date(), "dueDate": dueDate }
    const body = JSON.stringify(json)

    const response = await fetch("/submit", {
      method: "POST",
      body
    })

    const allTasks = await response.json()

    console.log("clientSends:", json)
    console.log("clientReceives:", allTasks)
    populateTaskTable(allTasks)
  } else {
    console.log("bad")
  }
}

function populateTaskTable(tasks) {
  const tableHeaders = ["Task", "Creation date", "Due date", "Days left"]
  const tableHeaderRow = document.getElementById("task-table-header")
  const tableBody = document.getElementById("task-table-body")

  if (tableHeaderRow.innerHTML.trim() === "") {
    tableHeaders.forEach(header => {
      let th = document.createElement("th");
      th.textContent = header;
      tableHeaderRow.appendChild(th);
    });
  }
  tableBody.innerHTML = ""

  tasks.forEach(obj => {
    let tr = document.createElement("tr");
    
  })
}


