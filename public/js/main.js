// FRONT-END (CLIENT) JAVASCRIPT HERE

var taskData = [];

const initial = async function() {
  // const response = await fetch({method:"GET"});
  // const text = await response.text();


  // Construct URL with data appended as query parameters
  const url = `/taskData/`;
  //?task=${encodeURIComponent(task)}&class=${encodeURIComponent(classx)}&duedate=${encodeURIComponent(duedate)}&importance=${encodeURIComponent(importance)}`

  const response = await fetch(url);
  
  // Handle the response data as needed
  const responseData = await response.json();
  console.log("Response Data:", responseData);
}

//initial();


const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  if(validateForm()) {
    var task = document.querySelector( "#task" );
    var classx = document.querySelector( "#class" );
    var duedate = document.querySelector( "#duedate" );
    var importance = document.querySelector( "#importance" );
    //const input = {task,classx,duedate,importance};
    const json = {id: -1, task: task.value, class: classx.value, duedate: duedate.value, importance: importance.value, priority: 0};
    const body = JSON.stringify( json );

    const response = await fetch( "/submit", {
      method:"POST",
      body
    })

    taskData = JSON.parse(await response.text());

    displayResults();
  }
}

window.onload = function() {
  const button = document.querySelector("#submit-button");
  button.onclick = submit;
}

// async function updateTaskData() {
//   const response = await fetch( "/submit", {method:"GET"})
// }

// Determine priority at beginning and display the results
// taskData.forEach(element => {
//   determinePriority(element);
// });
displayResults();

// Displays up to date results in the table
function displayResults() {
  var tbody = document.querySelector("#data-table tbody");
  // Clear tbody by setting to an empty string
  tbody.innerHTML = "";

  // Iterate over the list of objects
  taskData.forEach(function(data) {
    // Create a new table row
    var row = document.createElement("tr");

    // Create table cells and fill them with object properties
    var taskCell = document.createElement("td");
    taskCell.textContent = data.task;
    row.appendChild(taskCell);

    var classCell = document.createElement("td");
    classCell.className = "table-center";
    classCell.textContent = data.class;
    row.appendChild(classCell);

    var duedateCell = document.createElement("td");
    duedateCell.className = "table-center";
    duedateCell.textContent = data.duedate;
    row.appendChild(duedateCell);

    var importanceCell = document.createElement("td");
    importanceCell.className = "table-center";
    importanceCell.textContent = data.importance;
    row.appendChild(importanceCell);

    var priorityCell = document.createElement("td");
    priorityCell.className = "table-center";
    priorityCell.textContent = data.priority;
    row.appendChild(priorityCell);

    var editCell = document.createElement("td");
    editCell.className = "table-center";
    var editButton = document.createElement("input");
    editButton.type = "button";
    editButton.className = "button";
    editButton.value = "Edit";
    editButton.onclick = function() {editElement(data);};
    editCell.appendChild(editButton);

    var deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.className = "button";
    deleteButton.value = "Delete";
    deleteButton.onclick = function() {deleteElement(data);};
    editCell.appendChild(deleteButton);

    row.appendChild(editCell);

    // Append the row to the table body dependent on priority level (higher priority goes higher)
    
    // If nothing is in the table
    if(tbody.children[0] == null) {
      tbody.appendChild(row);
    } else {
      var i = 0;
      var check = true;
      while(check && i < tbody.children.length) {
        if(Number(tbody.children[i].children[4].textContent) >= Number(row.children[4].textContent)) {
          tbody.insertBefore(row, tbody.children[i]);
          check = false;
        }      
        i++;
      }

      // If the new child is the last element
      if(check == true) {
        tbody.appendChild(row);
      }
    }
  });
}

// Deletes the specified element
const deleteElement = async function(data) {
  const body = JSON.stringify( data );
  const response = await fetch( "/delete", {
    method:"POST",
    body
  })

  taskData = JSON.parse(await response.text());
  displayResults();
}

// Allows edits to the spcified element
function editElement(data) {
  document.getElementById("task").value = data.task;
  document.getElementById("class").value = data.class;
  document.getElementById("duedate").value = data.duedate;
  document.getElementById("importance").value = data.importance;


}

// Validates the format of the submission before submitting
function validateForm() {
  var dateInput = document.getElementById("duedate");
  var datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
  var importanceInput = document.getElementById("importance");
  // Checks date format
  if (!datePattern.test(dateInput.value)) {
    alert("Please enter the date in MM/DD/YYYY format.");
    return false;
  }

  // Checks importance input
  if(!(importanceInput.value == "No" || importanceInput.value == "Yes")) {
    alert("Please enter 'Yes' or 'No'");
    return false;
  }
  return true;
}


function printData() {
  for (let i = 0; i < taskData.length; i++) {
    console.log(taskData[i].task + " " + taskData[i].class + " " + taskData[i].duedate + " " + taskData[i].priority)
  }
}