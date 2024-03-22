// FRONT-END (CLIENT) JAVASCRIPT HERE

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

  const text = await response.text()

  console.log( "text:", text )

  insetElementToTable(text)

}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}




//CUSTOM CODE: Add this to the table
function insetElementToTable(text)
{
  const table = document.getElementById("InformationTable")
  let row = table.insertRow(1)
  let cell = row.insertCell(0)
  console.log(text)
  cell.innerHTML = text;
}