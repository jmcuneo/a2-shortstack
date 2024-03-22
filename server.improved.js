const http = require( "http" ),
    fs   = require( "fs" ),
    mime = require( "mime" ),
    dir  = "public/",
    port = 3000

const appdata = [];

const server = http.createServer( function( request,response ) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 )

  if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  } else if( request.url === "/appdata" ) {
    response.writeHeader( 200, { "Content-Type": "Text" })
    response.end(JSON.stringify(appdata));
  } else {
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
    dataString += data
  })

  request.on( "end", function() {

    var entry = JSON.parse( dataString );
    console.log("POST")
    console.log( entry )

    /* for an entry we need to parse the bday string and then calculate age
    const bdayString = entry.birthday;
    const bdayParts = bdayString.split("/");
    const bday = new Date(parseInt(bdayParts[2]), parseInt(bdayParts[0]) - 1, parseInt(bdayParts[1]));
    const today = new Date();

    let age = today.getFullYear() - bday.getFullYear();
    const month = today.getMonth() - bday.getMonth();
    if(month < 0 || (month === 0 && today.getDate() < bday.getDate())) {
      age--;
    }*/
    entry.age = 99;
    entry.fullName = entry.firstName + " " + entry.lastName;

    // set id to length since it will be the latest entry
    const id = appdata.length;
    entry.id = id;

    appdata.push(entry);

    //
    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end("successfully added new entry")
  })
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
