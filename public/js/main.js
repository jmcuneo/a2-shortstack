const DAYS_LEFT_COL = 3;

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
    const json = { "task": input, "creationDate": new Date().toISOString().split("T")[0], "dueDate": dueDate }
    const body = JSON.stringify(json)

    const response = await fetch("/submit", {
      method: "POST",
      body
    })

    const allTasks = await response.json()
    populateTaskTable(allTasks)
  } else {
    console.log("did not validate")
  }
}

const tableSort = function () {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("myTable");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[DAYS_LEFT_COL];
      y = rows[i + 1].getElementsByTagName("TD")[DAYS_LEFT_COL];
      //check if the two rows should switch place:
      if (Number(x.innerHTML) > Number(y.innerHTML)) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

const tableDeleteButton = async function (buttonTarget) {
  //we only allow unique tasks so this is fine
  let row = buttonTarget.closest("tr")
  let taskText
  if (row) {
    taskText = row.cells[1].textContent;
  } else {
    throw new Error("button without task")
  }

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "task": taskText }),
  };

  const response = await fetch("/delete", options)

  if (response.ok) {
    const dataJson = await response.json()
    populateTaskTable(dataJson)
  }
}

function populateTaskTable(tasks) {
  const tableHeaders = ["", "Task", "Creation date", "Due date", "Days left"]
  const tableHeader = document.getElementById("task-table-header")
  const tableBody = document.getElementById("task-table-body")

  if (tableHeader.innerHTML.trim() === "") {
    let tr = document.createElement("tr")
    tableHeaders.forEach(header => {
      let th = document.createElement("th")
      th.setAttribute("scope", "col")
      th.setAttribute("class", header.toLowerCase().replace(" ", "-"))
      th.textContent = header;
      if (header === "Days left") {
        th.onclick = tableSort
      }
      tr.appendChild(th)
    });
    tableHeader.appendChild(tr)
  }

  tableBody.innerHTML = ""

  tasks.forEach(obj => {
    let tr = document.createElement("tr")

    let delButtonCell = document.createElement('td')
    let deleteButton = document.createElement('button')
    deleteButton.onclick = function (event) {
      tableDeleteButton(event.target)
    }
    deleteButton.textContent = "Delete row"
    deleteButton.setAttribute("class", "del-button")
    delButtonCell.appendChild(deleteButton)
    tr.appendChild(delButtonCell)

    Object.values(obj).forEach(val => {
      let td = document.createElement("td");
      td.textContent = val
      tr.appendChild(td)
    })
    tableBody.appendChild(tr)
  })
}


