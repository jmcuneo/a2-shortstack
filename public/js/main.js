// FRONT-END (CLIENT) JAVASCRIPT HERE


const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  //getting input from user
  //front string and backstring are from textbox 
  //they get concatenated together
  //calculate string length
  //send string to json and then to body
 
  const frontString = document.querySelector("#frontstring").value,
    backString = document.querySelector("#backstring").value,
    concatenatedString = frontString + ' ' + backString,
    stringLength = concatenatedString.length - 1;
    var method = "/submit";
    body = JSON.stringify({method: method, string : concatenatedString} )
  //addData(concatenatedString);
  const response = await fetch("/submit", {
    method: "POST",
    body : body
  })

  const text = await response.text();
  //get table element to be modified

  updateTable();
}

async function addData(combinedString){
  const method = "/add";
  const response = await fetch("/add", {
    method: "POST",
    body: JSON.stringify({method: method , string: combinedString})
  })
  updateTable();
}

async function updateTable() {

  const response = await fetch("/getArray")
  let currentArray = await response.json();
  console.log("Hola!");
  console.log(currentArray);

  const tableElement = document.getElementById('responseTable');
  let count = 0;
  tableElement.innerHTML = ''; // Clear existing table contents

   // Create table header row
   const headerRow = document.createElement('tr');
   const headers = ['Entry Number', 'Combined String', 'String Length', 'Delete', 'Edit'];
   headers.forEach(headerText => {
     const headerCell = document.createElement('th');
     headerCell.textContent = headerText;
     headerRow.appendChild(headerCell);
   });
   tableElement.appendChild(headerRow);
 
   // Populate table with data
   currentArray.forEach((entry, index) => {
     const row = document.createElement('tr');
 
     // Entry Number
     const cell1 = document.createElement('td');
     cell1.textContent = index + 1; // Index starts from 0, so add 1 for display
     row.appendChild(cell1);
 
     // Combined String
     const cell2 = document.createElement('td');
     cell2.textContent = entry;
     row.appendChild(cell2);
 
     // String Length
     const cell3 = document.createElement('td');
     cell3.textContent = entry.length;
     row.appendChild(cell3);
 
     // Delete Button
     const cell4 = document.createElement('td');
     const deleteButton = document.createElement('button');
     deleteButton.textContent = 'Delete';
     deleteButton.addEventListener('click', function () {
       deleteEntry(index);
     });
     cell4.appendChild(deleteButton);
     row.appendChild(cell4);
 
     // Edit Button
     const cell5 = document.createElement('td');
     const editButton = document.createElement('button');
     editButton.textContent = 'Edit';
     editButton.addEventListener('click', function () {
      const newInput = prompt('Enter new value: ');
      editEntry(index, newInput);
     });
     cell5.appendChild(editButton);
     row.appendChild(cell5);
 
     // Append the row to the table
     tableElement.appendChild(row);
   });
}

async function deleteEntry(index){
  const method = "/delete";
  //const markedString = currentArray[index];
  const response = await fetch("/delete", {
    method: "POST",
    body: JSON.stringify({method: method , index: index})
  })
  updateTable();
}

async function editEntry(index, content){
  const method = "/edit";
  const response = await fetch("/edit", {
    method: "POST",
    body: JSON.stringify({method: method , index: index, content: content})
  })
  updateTable();
}



window.onload = function () {
  updateTable();
  const button = document.querySelector("button");
  button.onclick = submit;
}