// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const val1 = document.querySelector("#chore"),
        val2 = document.querySelector("#rating"),
        val3 = document.querySelector("#length"),
        val4 = document.querySelector("#finished").checked,
        json = {chore: val1.value, rating: val2.value, length: val3.value, finished: val4},
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

function displayData(text) {

}