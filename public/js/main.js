// FRONT-END (CLIENT) JAVASCRIPT HERE

let tableIndex = 0;

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

  let newData = { "model": input.value, "year": 0, "mpg": 100 }

  const postData = await  fetch("data", {
    method:"POST",
    body
  })

  postData.


  insetElementToTable(newData)

}

window.onload = async function() {
  const button = document.querySelector("button");
  button.onclick = submit;


  //WORKS!
  const populateTable = await fetch("/appdata",
      {
        method:"GET"
      })

  let data = await populateTable.json();

  console.log(data)

  for(let i = 0; i < data.length; i++)
  {
    insetElementToTable(data[i])
  }


}



//CUSTOM CODE: Add this to the table
function insetElementToTable(element)
{
  tableIndex++;
  const table = document.getElementById("InformationTable")
  let row = table.insertRow(tableIndex)

  for(let i = 0; i <= 3; i++)
  {
    let cell = row.insertCell(i)

    if(i == 0)
    {
      cell.innerHTML = element.model;
    }
    else if(i == 1)
    {
      cell.innerHTML = element.year;
    }
    else if(i == 2)
    {
      cell.innerHTML = element.mpg;
    }
    else if(i == 3)
    {
      let curDate = new Date()
      cell.innerHTML = (curDate.getMonth() + 1) + "/" + curDate.getDate() + "/" + curDate.getFullYear()
    }

  }



}