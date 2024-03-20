// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( "#task" ),
        json = {task: input.value},
        body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method:"POST",
    body
  })

  const text = await response.text()

  console.log( "text:", text )
}

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
}



const taskData = [
  { "id": 1, "task": "A1 HW", "class": "CS4241", "duedate": "03/20/2024", "important": "Yes", "priority": 0},
  { "id": 2, "task": "HW 1", "class": "CS4342", "duedate": "03/22/2024", "important": "No", "priority": 0},
  { "id": 3, "task": "Lecture notes", "class": "ECE3849", "duedate": "03/24/2024", "important": "Yes", "priority": 0},
  { "id": 4, "task": "Hello", "class": "ECE3849", "duedate": "04/03/2024", "important": "Yes", "priority": 0}
]

// Determine priority at beginning and display the results
taskData.forEach(element => {
  determinePriority(element);
});
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

    var importantCell = document.createElement("td");
    importantCell.className = "table-center";
    importantCell.textContent = data.important;
    row.appendChild(importantCell);

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


// Determines the priority based on duedate, importance, and the current date
function determinePriority(data) {
  var currentDate = new Date();

  //turn duedate into a date object
  var parts = data.duedate.split("/");
  var dueDate = new Date(parts[2], parts[0] - 1, parts[1]);

  // Convert both dates to UTC
  var utcDate1 = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  var utcDate2 = Date.UTC(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());

  // Calculate different in ms and then convert to days
  var diffDays = Math.floor(Math.abs(utcDate2 - utcDate1) / (1000 * 60 * 60 * 24));

  // Determine priority
  if((diffDays <= 2 && data.important == "Yes") || (diffDays <= 1 && data.important == "No")) {
    data.priority = 1;
  } else if((diffDays <= 3 && data.important == "Yes") || (diffDays <= 2 && data.important == "No")) {
    data.priority = 2;
  } else if((diffDays <= 4 && data.important == "Yes") || (diffDays <= 3 && data.important == "No")) {
    data.priority = 3;
  } else {
    data.priority = 4;
  }

}

// Deletes the specified element
function deleteElement(data) {
  taskData.splice(data, 1);
  displayResults();
}

// Allows edits to the spcified element
function editElement(data) {
  document.getElementById("task").value = data.task;
  document.getElementById("class").value = data.class;
  document.getElementById("duedate").value = data.duedate;
  document.getElementById("importance").value = data.important;


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