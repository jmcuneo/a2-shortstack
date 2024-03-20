// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day

  var inputs = document.querySelectorAll("input[required]");
  var isValid = true;

  inputs.forEach(function(input) {
    if(!input.value.trim()){
      isValid = false;
    }
  });
  if(!isValid){
    event.preventDefault();
    alert("Please fill out all required fields");
  }

  const response = await fetch( "/submit", {
    method:"POST",
    body
  })

  const text = await response.text()

  console.log( "text:", text )
}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}