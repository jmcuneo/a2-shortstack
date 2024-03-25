const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

const appdata = [
  { "model": "toyota", "year": 1999, "mpg": 23 },
  { "model": "honda", "year": 2004, "mpg": 30 },
  { "model": "ford", "year": 1987, "mpg": 14} 
]

let database = [];
const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )
  }else if( request.method === "POST" ) {
    addData(request, response);
  } else if (request.method === "DELETE") {
    deleteData(request, response);
  } else if (request.method === "PATCH") {
    patchData(request, response);
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 )
  if( request.url === "/" ) {
    sendFile( response, "public/homepage.html" )
  } else if (request.url === "/api/games") {
    response.writeHeader( 200, { "Content-Type": "text/plain" })
    response.end( database.join("|"));
  } else {
    sendFile( response, filename )
  }
}

const addData = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data
  })

  request.on( "end", function() {
    const data = JSON.parse( dataString );
    let victor = "draw";
    if (data.score2 > data.score1) {
      victor = data.team2;
    } else if (data.score2 < data.score1) {
      victor = data.team1;
    }

    const res = JSON.stringify({team1: data.team1, team2: data.team2, score1: data.score1, score2: data.score2, victor: victor});
    database.push(res);
    console.log(database);
    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end(res)
  })
}

const deleteData = function (request, response) {
  let dataString = "";

  request.on( "data", function( data ) {
    dataString += data
  })

  request.on( "end", function() {
    const data = JSON.parse(dataString);
    let victor = "draw";
    if (data.score2 > data.score1) {
      victor = data.team2;
    } else if (data.score2 < data.score1) {
      victor = data.team1;
    }

    const game = JSON.stringify({
      team1: data.team1,
      team2: data.team2,
      score1: data.score1,
      score2: data.score2,
      victor: victor
    });
    console.log(game);
    const index = database.indexOf(game);
    if (index === -1) {
      response.writeHead(200, "OK", {"Content-Type": "text/plain"})
      response.end("No such game exists");
      console.log("none");
    } else {
      database.splice(index, 1);
      console.log(database);
      response.writeHead(200, "OK", {"Content-Type": "text/plain"})
      response.end("Game deleted");
    }
  });
}

const patchData = function (request, response) {
  let dataString = "";

  request.on( "data", function( data ) {
    dataString += data
  })

  request.on( "end", function() {
    console.log("here");
    const data = JSON.parse(dataString);
    let victor = "draw";
    if (data.score2 > data.score1) {
      victor = data.team2;
    } else if (data.score2 < data.score1) {
      victor = data.team1;
    }

    const game = JSON.stringify({
      team1: data.team1,
      team2: data.team2,
      score1: data.score1,
      score2: data.score2,
      victor: victor
    });
    const index = database.indexOf(game);
    if (index === -1) {
      response.writeHead(200, "OK", {"Content-Type": "text/plain"})
      response.end("No such game exists");
      console.log(database);
    } else {
      let newVictor = "draw";
      if (data.newScore2 > data.newScore1) {
        newVictor = data.team2;
      } else if (data.newScore2 < data.newScore1) {
        newVictor = data.newTeam1;
      }
      database[index] = JSON.stringify({
        team1: data.newTeam1,
        team2: data.newTeam2,
        score1: data.newScore1,
        score2: data.newScore2,
        victor: newVictor
      });
      console.log(database);
      response.writeHead(200, "OK", {"Content-Type": "text/plain"})
      response.end("Game modified");
    }
  });
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we"ve loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { "Content-Type": type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( "404 Error: File Not Found" )

     }
   })
}

server.listen( process.env.PORT || port )
