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
  { "name": "Jack", "birthday": "05/24/2002", "preferredCake": "chocolate", "age": 21, "id": 0 },
  { "name": "Jim", "birthday": "10/13/1938", "preferredCake": "vanilla", "age": 85, "id": 1 },
  { "name": "John", "birthday": "07/18/1967", "preferredCake": "swirl", "age": 56, "id": 2 } 
]

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }else if( request.method === "DELETE") {
    handleDelete( request, response )
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  } else if( request.url === "/appdata" ) {
    sendData( response )
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
    console.log( entry )

    // ... do something with the data here!!!
    const bdayString = entry.birthday;
    const bdayParts = bdayString.split("/");
    const bday = new Date(parseInt(bdayParts[2]), parseInt(bdayParts[1]) - 1, parseInt(bdayParts[0]));
    const today = new Date();

    const age = today.getFullYear() - bday.getFullYear();
    entry.age = age;

    const id = appdata.length;
    entry.id = id;

    appdata.push(entry);

    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end("successfully added new entry")
  })
}

const handleDelete = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {

    var entry = JSON.parse( dataString );
    console.log( entry )

    const id = entry.id;

    if(id > -1 & id < appdata.length) {
      appdata.splice(id, 1);
      resetIDs();
      response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
      response.end("successfully removed entry")
    } else {
      response.writeHeader( 404 )
      response.end( "404 Error: Entry Not Found" )
    }

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

const sendData = function( response ) {

  response.writeHeader( 200, { "Content-Type": "Text" })
  response.end(JSON.stringify(appdata));

}

const resetIDs = async function() {
  const len = appdata.length;
  for(let i = 0; i < len; i++) {
    var cur = appdata[i];
    cur.id = i;
  }
}

server.listen( process.env.PORT || port )
