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
        json = { action: "add", playerName: playerName, score: Number(score), gameDate: gameDate},
        body = JSON.stringify(json);

    await fetch( "/submit", {
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body
    }).then(response => response.json())
        .then(json => {
            console.log(json);
            updateScoreToDisplay(json); // this will update the new dataset to display
        })
        .catch(error => console.error('Error: ', error)); // for debugging purpose
}

window.onload = function() {
    const button = document.querySelector("button");
    button.onclick = submit;
}

/**
 * a function to render scores inside the '#scoreDisplay' to display
 * include 'add', 'delete' and 'modify' display
 * @param scores are the inputted scores
 */
function updateScoreToDisplay(scores){
    const display = document.querySelector('#scoreDisplay');

    // to clear the current content
    display.innerHTML = '';

    scores.forEach((score, index) => {
        const scoreElement = document.createElement('div');
        scoreElement.innerHTML =
            `
      Player: ${score.playerName}, Score: ${score.score}, Date: ${score.gameDate}, Ranking: ${score.ranking}
      <button onclick="deleteScore('${score.playerName}')">Delete</button>
      <button onclick="modifyScore('${score.playerName}', ${index})">Modify</button>
    `;
        display.appendChild(scoreElement);
    });
}

/**
 * delete the score and display it
 * @param playerName
 */
async function deleteScore(playerName) {
    await fetch('/submit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({action: 'delete', playerName})
    }).then(response => response.json())
        .then(json => {
            updateScoreToDisplay(json);
        });
}

/**
 * modify the score and display it
 * @param playerName
 * @param scoreIndex
 */
async function modifyScore(playerName, scoreIndex) {
    const newScore = prompt('Enter new score:');

    if (newScore) {
        await fetch('/submit', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({action: 'modify', playerName, score: Number(newScore),
                gameDate: new Date().toISOString().split('T')[0]})
        }).then(response => response.json())
            .then(json => {
                updateScoreToDisplay(json);
            });
    }
}