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
      json = {model: input1.value, year: input2.value, mpg: input3.value},
      body = JSON.stringify(json)

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  }).then(function (response){
    return response.json()
  }).then((function (json){
    console.log(json)
      }
  ))

  const text = await response.text()

  console.log( "text:", text )
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
      json = {model: input1.value, year: input2.value, mpg: input3.value},
      body = JSON.stringify(json)

  const response = await fetch( "/submit", {
    method:"DELETE",
    body
  }).then(function (response){
    return response.json()
  }).then((function (json){
        console.log(json)
      }
  ))

  const text = await response.text()

  console.log( "text:", text )
}
window.onload = function() {
   const submitButton = document.getElementById("submit");
  submitButton.onclick = submit;
  const deleteButton = document.getElementById("delete");
  deleteButton.onclick = remove;
}