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





// Sample list of objects
var people = [
  { name: "John", age: 30, city: "New York" },
  { name: "Alice", age: 25, city: "Los Angeles" },
  { name: "Bob", age: 35, city: "Chicago" }
];

const appdata = [
  { "task": "A1 HW", "class": "CS4241", "duedate": "4/1/24", "priority": 1},
  { "task": "HW 1", "class": "CS4342", "duedate": "4/2/24", "priority": 2 },
  { "task": "Lecture notes", "class": "ECE3849", "duedate": "4/3/24", "priority": 3} 
]


// Get reference to the table body
var tbody = document.querySelector("#data-table tbody");

// Iterate over the list of objects
appdata.forEach(function(data) {
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
  priorityCell.textContent = data.priority;
  row.appendChild(priorityCell);

  // Append the row to the table body
  tbody.appendChild(row);
});