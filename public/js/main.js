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
  { "id": 1, "task": "A1 HW", "class": "CS4241", "duedate": "4/1/24", "priority": 3},
  { "id": 2, "task": "HW 1", "class": "CS4342", "duedate": "4/2/24", "priority": 2 },
  { "id": 3, "task": "Lecture notes", "class": "ECE3849", "duedate": "4/3/24", "priority": 1},
  { "id": 4, "task": "Hello", "class": "ECE3849", "duedate": "4/3/24", "priority": 4}
]

displayResults();


function displayResults() {
  // For adding the data into the table
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
    classCell.textContent = data.class;
    row.appendChild(classCell);

    var duedateCell = document.createElement("td");
    duedateCell.textContent = data.duedate;
    row.appendChild(duedateCell);

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
    //editButton.onclick = 
    editCell.appendChild(editButton);

    var deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.className = "button";
    deleteButton.value = "Delete";
    deleteButton.onclick = function() {deleteElement(data.id);};
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
        if(Number(tbody.children[i].children[3].textContent) >= Number(row.children[3].textContent)) {
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



function deleteElement(id) {
  console.log(id);
  printData();
  taskData.splice(taskData.findIndex((element) => element.id == id), 1);
  printData();
  displayResults();
}


function printData() {
  for (let i = 0; i < taskData.length; i++) {
    console.log(taskData[i].task + " " + taskData[i].class + " " + taskData[i].duedate + " " + taskData[i].priority)
  }
}