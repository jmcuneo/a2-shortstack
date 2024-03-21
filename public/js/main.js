// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input1 = document.querySelector( "#model" ),
      input2 = document.querySelector("#year"),
      input3 = document.querySelector("#mpg"),
      input4 = document.querySelector("#fuelLoad"),
      json = {model: input1.value, year: input2.value, mpg: input3.value, fuelLoad: input4.value},
      body = JSON.stringify(json)

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  })

  const text = await response.text()

  console.log( "text:", text )
/*
  let table = document.getElementById("table");
  for(let i = 0; i < appdata.length; i++){
    var row = table.insertRow(i);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = Object.values(JSON.parse( dataString ))[0];
    cell2.innerHTML = Object.values(JSON.parse( dataString ))[0];
    cell3.innerHTML = Object.values(JSON.parse( dataString ))[0];
  }

 */
}

const remove = async function (event){
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  const input1 = document.querySelector( "#model" ),
      input2 = document.querySelector("#year"),
      input3 = document.querySelector("#mpg"),
      input4 = document.querySelector("#fuelLoad"),
      json = {model: input1.value, year: input2.value, mpg: input3.value, fuelLoad: input4.value},
      body = JSON.stringify(json)

  const response = await fetch( "/", {
    method:"DELETE",
    body
  })

  const text = await response.text()

  console.log( "text:", text )
}
/*
const getData = async function(event){
  event.preventDefault();
  const response = await fetch( "/", {
method:"GET"
})
}

 */

const getData = async function() {

  const response = await fetch( "/data", {
    method:"GET"
  }).then((response) => response.json()
  ).then((json) =>console.log(json))


  //const text = await response.text()

  //console.log( "text:", text )

}

window.onload = function() {

getData().then(r => console.log("stuff"));
  const submitButton = document.getElementById("submit");
  submitButton.onclick = submit;
  const deleteButton = document.getElementById("delete");
  deleteButton.onclick = remove;
}