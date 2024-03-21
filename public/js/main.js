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

  const response = await fetch( "/submit", {
    method:"POST",
    body
  });

  const text = await response.text();
  console.log("text:", text);

  let table = document.getElementById("table");
  let numRows = table.rows.length;
  let row = table.insertRow(numRows);
  let cell1 = row.insertCell(0);
  cell1.innerHTML = "NEW";
}

window.onload = function()
{
  const button = document.querySelector("button");
  button.onclick = submit;
}