// FRONT-END (CLIENT) JAVASCRIPT HERE

let tableIndex = 1;

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

  insetElementToTable(input.value)

}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}




//CUSTOM CODE: Add this to the table
function insetElementToTable(text)
{
  tableIndex++;
  const table = document.getElementById("InformationTable")
  let row = table.insertRow(tableIndex)

  for(let i = 0; i <= 3; i++)
  {
    let cell = row.insertCell(i)

    if(i == 0)
    {
      cell.innerHTML = text;
    }
    else if(i == 1)
    {

    }
    else if(i == 2)
    {

    }
    else if(i == 3)
    {
      let curDate = new Date()
      cell.innerHTML = (curDate.getMonth() + 1) + "/" + curDate.getDate() + "/" + curDate.getFullYear()
    }

  }



}