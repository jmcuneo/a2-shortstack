// FRONT-END (CLIENT) JAVASCRIPT HERE

// Triggers upon site load
window.onload = function()
{
  getData();
  const submitButton = document.getElementById("submit");
  submitButton.onclick = submit;
  const deleteButton = document.getElementById("delete");
  deleteButton.onclick = deleteLastEntry;
  const adjustButton = document.getElementById("adjust");
  adjustButton.onclick = adjustLastEntry;
}

// Submit a new entry to the GPA data
const submit = async function(event) 
{
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();
  
  const classInput = document.querySelector("#class");
  const gradeInput = document.querySelector("#grade");
  const creditsInput = document.querySelector("#credits");

  const json = {class: classInput.value, grade: gradeInput.value, credits: creditsInput.value};
  const body = JSON.stringify(json);

  const response = await fetch("/submit",
  {
    method:"POST",
    body
  });

  const text = await response.text();
  const newData = JSON.parse(text);
  addToTable(newData);
}

const adjustLastEntry = async function(event)
{
  event.preventDefault(event);

  const classInput = document.querySelector("#class");
  const gradeInput = document.querySelector("#grade");
  const creditsInput = document.querySelector("#credits");

  const json = {class: classInput.value, grade: gradeInput.value, credits: creditsInput.value};
  const body = JSON.stringify(json);

  const response = await fetch("/adjust",
  {
    method:"POST",
    body
  });

  const text = await response.text();
  const newData = JSON.parse(text);

  const rowCount = document.getElementsByClassName("row").length;
  const table = document.getElementById("table");
  table.deleteRow(rowCount);
  addToTable(newData);
}

const deleteLastEntry = async function(event)
{
  event.preventDefault(event);

  const rowCount = document.getElementsByClassName("row").length;
  const body = JSON.stringify(rowCount);
  const response = await fetch("/delete",
  {
    method:"POST",
    body
  });

  const table = document.getElementById("table");
  if (rowCount > 0)
  {
    table.deleteRow(rowCount);
  }
}

// Obtain the GPA table data from the server 
const getData = async function()
{
  let response = await fetch("/display",
  {
    method:"GET",
  });
  const text = await response.text();
  buildInitialTable(JSON.parse(text));
}

// Optain the final GPA value from the server
const getGpa = async function()
{
  let response = await fetch("/gpa",
  {
    method:"GET",
  });
  const text = await response.text();
  displayGpa(text);
}

// Create the initial GPA table with current data
const buildInitialTable = function(initialData)
{
  for (let i = 0; i < initialData.length; i++)
  {
    addToTable(initialData[i]);
  }
}

// Add a new entry to the GPA data table
const addToTable = function(newData)
{
  // Initialize table info
  let table = document.getElementById("table");
  let numRows = table.rows.length;
  let row = table.insertRow(numRows);
  row.className = "row";

  // Create cels
  let classCell = row.insertCell(0);
  classCell.innerHTML = newData.class;
  let gradeCell = row.insertCell(1);
  gradeCell.innerHTML = newData.grade.toUpperCase();
  let creditsCell = row.insertCell(2);
  creditsCell.innerHTML = newData.credits;

  // Upadte the GPA
  getGpa();
}

// Display the GPA value on screen
const displayGpa = function(gpaValue)
{
  let gpaText = document.getElementById("gpa");
  gpaText.innerHTML = `GPA: ${gpaValue}`;
}