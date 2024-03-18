// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const val1 = document.querySelector( "#firstVal" ),
        val2 = document.querySelector( "#secVal" ),
        op = document.getElementsByName( "operator" ),
        guess = document.querySelector( "#guess" ),
        json = { val1: val1.input, val2: val2.input, op: op.input, guess: guess.input},
        body = JSON.stringify( json )

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