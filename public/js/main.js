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
      .then(json => {
        console.log(json);
        updateScoreToDisplay(json); // this will update the new dataset to display
      });
}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}

/**
 * a function to render scores inside the '#scoreDisplay' to display
 * @param scores are the inputted scores
 */
function updateScoreToDisplay(scores){
  const display = document.querySelector('#scoreDisplay');

  // to clear the current content
  display.innerHTML = '';

  scores.forEach(score => {
    const scoreElement = document.createElement('div');
    scoreElement.textContent =
        `Player: ${score.playerName}, Score: ${score.score}, Date: ${score.gameDate}, Ranking: ${score.ranking}`;
    display.appendChild(scoreElement);
  });
}