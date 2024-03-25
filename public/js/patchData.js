const patchData = async function( event ) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()

    const team1 = document.querySelector("#team1").value;
    const team2 = document.querySelector("#team2").value;
    const score1 = document.querySelector("#score1").value;
    const score2 = document.querySelector("#score2").value;
    const newTeam1 = document.querySelector("#newTeam1").value;
    const newTeam2 = document.querySelector("#newTeam2").value;
    const newScore1 = document.querySelector("#newScore1").value;
    const newScore2 = document.querySelector("#newScore2").value;

    const body = JSON.stringify({ team1: team1, team2: team2, score1: score1, score2: score2,
        newTeam1: newTeam1, newTeam2: newTeam2, newScore1: newScore1, newScore2: newScore2});
    console.log(body);

    const response = await fetch( "/submit", {
        method:"PATCH",
        body
    });

    const text = await response.text()

    console.log( "text:", text )
    await updateTable();
}

const updateTable = async function () {
    const data = (await (await fetch("/api/games", {
        method: "GET"
    })).text()).split("|");
    let table = "";
    table += "<table border='3'><tr><th>Team1</th><th>Team2</th><th>Score1</th><th>Score2</th><th>Winner</th></tr>"
    console.log(data);
    if (data[0] !== '') {
        for (let i = 0; i < data.length; i++) {
            table += "<tr>";
            const row = JSON.parse(data[i]);
            table += "<td>" + row.team1 + "</td><td>" + row.team2 + "</td><td>" + row.score1 + "</td><td>" + row.score2 + "</td><td>" + row.victor + "</td>";
        }
    }
    table += "</table>";
    document.getElementById("tableDiv").innerHTML = table;
}

window.onload = async function () {
    document.querySelector("#modify").onclick = patchData;
    await updateTable();
}