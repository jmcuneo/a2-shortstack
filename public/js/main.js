// FRONT-END (CLIENT) JAVASCRIPT HERE

const table = async function( event ) {
  event.preventDefault()
  const response = await fetch( "/table", {
    method:"POST",
  }).then(
  function(response){
    return response.text()
  })  .then(data => {
    // Handle the response based on its content type
    if (typeof data === 'string') {
      // Render HTML directly or process it
      document.body.innerHTML = data
    } else {
      // Handle JSON data
      console.log(data);
    }
  })
}
const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  const input = document.querySelector("#yourname"),
      json = {"yourname": input.value},
      body = JSON.stringify(json)

  const response = await fetch( "/submit", {
    method:"POST",
    body
  }).then(  function(response){
    return response.text()
  })  .then(data => {
    // Handle the response based on its content type
    if (typeof data === 'string') {
      // Render HTML directly or process it
      document.body.innerHTML = data
    } else {
      // Handle JSON data
      console.log(data);
    }
  })


  // const text = await response.text()
  // console.log( "text:", text)
}

  window.onload = function () {
    const button = document.querySelector("button");
    button.onclick = submit;
  }
