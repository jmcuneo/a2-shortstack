const submit = function (event) {
  event.preventDefault();

  const weight = document.querySelector("#weight").value;
  const rpe = document.querySelector("#rpe").value;
  const reps = document.querySelector("#reps").value;
  const json = {
    weight: weight,
    reps: reps,
    rpe: rpe,
  };
  const body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      loadTable(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return false;
};

// Function to put array values into a specified table
function populateTable(tableId, dataArray, rep) {
  var table = document.getElementById(tableId);
  var tbody = table.querySelector("tbody");
  tbody.innerHTML = "";
  for (var i = 10; i >= 6; i = i - 0.5) {
    var row = tbody.insertRow();
    var rpeCell = row.insertCell();
    var percentageCell = row.insertCell();
    var weightCell = row.insertCell();
    rpeCell.innerHTML = i;
    percentageCell.innerHTML = dataArray[0][rep][i].toFixed(2) + "%";
    weightCell.innerHTML = dataArray[1][rep][i].toFixed(2);
  }
}


const loadTable = (data) => {
  // Fetch the calculated results from the server
  const table = document.querySelector('#result-table')
  console.log(data);
  for (let i = 1; i <= 12; i++) {
    var tableId = "table" + i;
    console.log(tableId)
    populateTable(tableId, data, i);
  }
};



window.onload = function () {
  // Create a container div
  var tablesContainer = document.getElementById("tablesContainer");

  // Create 12 tables
  for (var i = 1; i <= 12; i++) {
    var table = document.createElement("table");
    table.id = "table" + i; // Set ID for each table
    if (i === 1) {
      table.style.display = "block"; // Show the first table by default
    } else {
      table.style.display = "none"; // Hide other tables by default
    }

    // Create table header
    var thead = table.createTHead();
    var headerRow = thead.insertRow();
    var rpeHeader = headerRow.insertCell();
    var percentageHeader = headerRow.insertCell();
    var weightHeader = headerRow.insertCell();
    rpeHeader.innerHTML = "RPE";
    percentageHeader.innerHTML = "% of 1RM";
    weightHeader.innerHTML = "Weight";

    // Create table body 
    var tbody = table.createTBody();
    for (var j = 1; j <= 9; j++) {
      var row = tbody.insertRow();
      var rpeCell = row.insertCell();
      var percentageCell = row.insertCell();
      var weightCell = row.insertCell();
      rpeCell.innerHTML = 10.5 - j * 0.5;
      percentageCell.innerHTML = "75%";
      weightCell.innerHTML = "100kg";
    }

    // Append table to the container
    tablesContainer.appendChild(table);
  }

  // Add event listeners to rep buttons
  for (var k = 1; k <= 12; k++) {
    var repButton = document.getElementById("rep" + k);
    repButton.addEventListener("click", function () {
      var tableNumber = parseInt(this.value);
      // Hide all tables
      for (var l = 1; l <= 12; l++) {
        document.getElementById("table" + l).style.display = "none";
      }
      // Show the corresponding table
      document.getElementById("table" + tableNumber).style.display = "block";
    });
  }
  const button = document.querySelector("#calculate");
  button.onclick = submit;
}
