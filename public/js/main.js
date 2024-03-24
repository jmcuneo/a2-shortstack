// FRONT-END (CLIENT) JAVASCRIPT HERE

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
  console.log("text:", text);
  const newData = JSON.parse(text);
  addToTable(newData);
}

window.onload = function()
{
  const submitButton = document.getElementById("submit");
  submitButton.onclick = submit;
}

const addToTable = function(newData)
{
  let table = document.getElementById("table");
  let numRows = table.rows.length;
  let row = table.insertRow(numRows);

  let classCell = row.insertCell(0);
  classCell.innerHTML = newData.class;
  let gradeCell = row.insertCell(1);
  gradeCell.innerHTML = newData.grade;
  let creditsCell = row.insertCell(2);
  creditsCell.innerHTML = newData.credits;
}