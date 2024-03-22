// FRONT-END (CLIENT) JAVASCRIPT HERE

window.onload = function() {
  const button = document.querySelector("#submit");
  button.onclick = submit;

  const clear = document.querySelector("#clear");
  clear.onclick = clearData;

  const date = document.getElementById("duedate");
  initDate(date);

  // Gets the data from the server (if there is any)
  fetchData();
}

function initDate(dateField) {
  // Initializes the date selector to the current date
  let date = new Date().toISOString("YYYY-MM-DD");
  dateField.value = date.substring(0, date.indexOf('T'));
}

async function fetchData() {
  // Used when the page first loads; it gets the data
  const body = JSON.stringify({'method':'load'});
  const response = await fetch("/load", {
    method:"POST",
    body
  });

  const data = await response.text();
  console.log("Data recieved from server.");
  createTable(JSON.parse(data));
}

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();
    
  if (document.getElementById("taskname").value === '') {
    alert("You must fill out all fields!");
    return;
  }

  let json = {};
  document.getElementById("todoForm").querySelectorAll("[data-send]").forEach(i => {
    // i is any element that has an id tag
    if (i.id === undefined) {
      // Not necessary for this assignment, but will still prevent errors
      console.error("ID undefined in form element");
      return;
    }
    json[i.id] = i.value;
  });
  json['method'] = "submit";

  const body = JSON.stringify( json );

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  });

  const newTable = await response.text();
  console.log("Data recieved from server.");
  createTable(JSON.parse(newTable));
}

const clearData = async function (event) {
  event.preventDefault();
  let json = {method: 'clear'};
  const body = JSON.stringify(json);
  const response = await fetch ("/clear", {
    method:"POST",
    body
  });
  const status = await response.text();
  console.log(status);

   // Delete previous elements
   document.querySelector("#todo > table").childNodes.forEach(a => a.remove());
   createTableHeaders();
};

function createTableHeaders() {
  const table = document.querySelector("#todo > table");
  // Delete any existing headers
  if (document.getElementById("tableheaders")) {
    document.getElementById("tableheaders").remove();
  }

  // Create new headers
  let createNewTh = (row, text) => {
    const th = document.createElement('th');
    th.appendChild(document.createTextNode(text));
    row.appendChild(th);
  };

  // Add headers to table
  const headerTr = table.insertRow();
  headerTr.id = "tableheaders";
  headerTr.class = "tableheaders";
  createNewTh(headerTr, 'Task');
  createNewTh(headerTr, 'Priority');
  createNewTh(headerTr, 'Due Date');
  createNewTh(headerTr, 'Recommended Order');
}

function createTable(newTable) {
  const table = document.querySelector("#todo > table");

  // Delete previous elements
  table.childNodes.forEach(a => a.remove());

  createTableHeaders();

  for (let i = 0; i < newTable.length; i++) {
    const tr = table.insertRow();
    let name = tr.insertCell();
    let priority = tr.insertCell();
    let duedate = tr.insertCell();
    let order = tr.insertCell();

    name.appendChild(document.createTextNode(newTable[i].taskname));
    priority.appendChild(document.createTextNode(newTable[i].priority));
    duedate.appendChild(document.createTextNode(newTable[i].duedate));
    order.appendChild(document.createTextNode(newTable[i].ordernum));

    // Makes it so that when you click on an element, it edits it
    tr.onclick = function () {
      document.getElementById('taskname').value = newTable[i].taskname;
      document.getElementById('priority').value = newTable[i].priority;
      document.getElementById('duedate').value = newTable[i].duedate;
    };
  }
}