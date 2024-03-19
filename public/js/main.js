// FRONT-END (CLIENT) JAVASCRIPT HERE

function radioValue () {
  var elem = document.getElementsByName("operator");
 
  for (let i = 0; i < elem.length; i++) {
      if (elem[i].checked){ return elem[i].value }
  }
}

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const val1 = document.querySelector( "#firstVal" ),
        val2 = document.querySelector( "#secVal" ),
        op = radioValue(),
        guess = document.querySelector( "#guess" ),
        json = { val1: val1.value, val2: val2.value, op: op, guess: guess.value},
        body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  })

  const resp = await response.json()

  console.log( "text:", resp)
}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}

function displayData(data) {
  document.getElementById("serverTable")
}