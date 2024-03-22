// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  const playerName = document.querySelector("#playerName").value,
      score = document.querySelector("#score").value,
      gameDate = document.querySelector("#gameDate").value,
      json = {playerName, score: Number(score), gameDate},
      body = JSON.stringify(json);

  const response = await fetch( "/submit", {
    method:"POST",
    headers:{'Content-Type': 'application/json'},
    body 
  }).then(response => response.json())
      .then(json => console.log(json));
  // Here need to update the client-side display to show the new dataset
}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}