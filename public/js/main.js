// FRONT-END (CLIENT) JAVASCRIPT HERE
var count = 1;
const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( "#yourname" ),
        json = { yourname: input.value },
        body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method:"POST",
    body
  })
  
  const text = await response.text();
  const tableElement = document.getElementById('responseTable');
  const nextRow = document.createElement('tr');

  const cell1 = document.createElement('td');
  const cell2 = document.createElement('td');
  cell1.textContent = "Entry " + count;
  count++;
  parsedData = JSON.parse(body);
  const name = parsedData.yourname;
  cell2.textContent = name;

  nextRow.appendChild(cell1);
  nextRow.appendChild(cell2);

  tableElement.appendChild(nextRow);
    
  console.log( "text:", text )
  
}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}