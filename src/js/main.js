// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  const date = document.querySelector( "#monthYear" );
  const rent = document.querySelector( "#rent" );
  const util = document.querySelector( "#util" );
  const food = document.querySelector( "#food" );
  const other = document.querySelector( "#other" );

  const json = {
    date: date.value,
    rent: rent.value,
    util: util.value,
    food: food.value,
    other: other.value
  };

  const body = JSON.stringify(json);

  const response = await fetch( "/submit", {
    method:"POST",
    body
  });

  const text = await response.text();
  const newInfo = JSON.parse(text);
  updateTable(newInfo[newInfo.length - 1]);
}

window.onload = function() {
  initialData();
  const button = document.querySelector("button");
  button.onclick = submit;
}

const updateTable = function (newInfo) {
  const table = document.querySelector("table");

  //Insert new row
  let row = table.insertRow(table.rows.length-1);
  row.insertCell(0).innerText = newInfo.date;
  row.insertCell(1).innerText = "$" + newInfo.rent.toFixed(2);
  row.insertCell(2).innerText = "$" + newInfo.util.toFixed(2);
  row.insertCell(3).innerText = "$" + newInfo.food.toFixed(2);
  row.insertCell(4).innerText = "$" + newInfo.other.toFixed(2);
  row.insertCell(5).innerText = "$" + newInfo.total.toFixed(2);

  //Update totals
  const totals = table.rows[table.rows.length-1];
  totals.cells[1].innerText = "$" + (parseInt(totals.cells[1].innerText.substring(1)) + newInfo.rent).toFixed(2);
  totals.cells[2].innerText = "$" + (parseInt(totals.cells[2].innerText.substring(1)) + newInfo.util).toFixed(2);
  totals.cells[3].innerText = "$" + (parseInt(totals.cells[3].innerText.substring(1)) + newInfo.food).toFixed(2);
  totals.cells[4].innerText = "$" + (parseInt(totals.cells[4].innerText.substring(1)) + newInfo.other).toFixed(2);
  totals.cells[5].innerText = "$" + (parseInt(totals.cells[5].innerText.substring(1)) + newInfo.total).toFixed(2);
}

const initialData = async function() {
  const response = await fetch( "/submit", {
    method:"POST"
  });

  const text = await response.text();
  const newInfo = JSON.parse(text);

  for (let i = 0; i < newInfo.length; i++) {
    updateTable(newInfo[i]);
  }
}
