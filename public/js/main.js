// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( "#yourname" ),
        json = { yourname: input.value },
        body = JSON.stringify( json ) //turns to string and put through the network

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  }).then(response => response.json()).then(function(json) {
    console.log(json)
  })

  const orderItem = async function(event){
    event.preventDefault()
    
  }

  const text = await response.text()

  console.log( "text:", text )
}

window.onload = function() {
   const button = document.querySelector("#submit");
  button.onclick = submit;
}

window.onload = function(){
  const button = document.querySelector("#itemSelect");
  button.onclick = submit;
}