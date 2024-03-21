const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000



/**
 * Base App Data
 * One entry represents a birthday entry
 * Name is person's name, 
 * birthday is date of bday in MM/DD/YYY form, 
 * preferred cake is their preferred flavor of cake,
 * age and id are calculated fields
 */
const appdata = [
  { "name": "Jack", "birthday": "05/24/2002", "preferredCake": "chocolate", "age": 21, "id": 0 },
  { "name": "Jim", "birthday": "10/13/1938", "preferredCake": "vanilla", "age": 85, "id": 1 },
  { "name": "John", "birthday": "07/18/1967", "preferredCake": "swirl", "age": 56, "id": 2 } 
]



/**
 * Server to send requests to proper handler
 */
const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }else if( request.method === "DELETE") {
    handleDelete( request, response )
  }else if( request.method === "PATCH") {
    handlePatch( request, response )
  }
})



/**
 * GET handler
 * @param {*} request is a server request
 * @param {*} response is the server reponse
 */
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



/**
 * POST handler
 * @param {*} request is a server request
 * @param {*} response is the server reponse
 */
const handlePost = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {

    var entry = JSON.parse( dataString );
    console.log("POST")
    console.log( entry )

    // for an entry we need to parse the bday string and then calculate age
    const bdayString = entry.birthday;
    const bdayParts = bdayString.split("/");
    const bday = new Date(parseInt(bdayParts[2]), parseInt(bdayParts[1]) - 1, parseInt(bdayParts[0]));
    const today = new Date();

    const age = today.getFullYear() - bday.getFullYear();
    entry.age = age;

    // set id to length since it will be the latest entry
    const id = appdata.length;
    entry.id = id;

    appdata.push(entry);

    // write reponse back
    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end("successfully added new entry")
  })
}



/**
 * DELETE handler
 * @param {*} request a server request
 * @param {*} response the server response
 */
const handleDelete = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {

    var entry = JSON.parse( dataString );
    console.log("DELETE")
    console.log( entry )

    // get the id of the entry to delete and check that it is a valid id
    const id = entry.id;

    if(id > -1 & id < appdata.length & !(id===null)) {

      // if valid id, delete it and reset the ids, then send back response
      appdata.splice(id, 1);
      resetIDs();
      response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
      response.end("successfully removed entry")
    } else {

      // if invalid id send error back
      response.writeHeader( 404 )
      response.end( "404 Error: Entry Not Found" )
    }

  })
}



/**
 * PATCH handler
 * @param {*} request 
 * @param {*} response 
 */
const handlePatch = function ( request, response ) {

  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {

    var entry = JSON.parse( dataString );
    console.log("PATCH")
    console.log( entry )

    // get id of entry to update then check that it is a valid id
    const id = entry.id;

    if(id > -1 & id < appdata.length & !(id===null)) {

      // if it is a valid id, update the current entry to the new entry
      appdata[id] = entry;

      // recalculate age
      const bdayString = entry.birthday;
      const bdayParts = bdayString.split("/");
      const bday = new Date(parseInt(bdayParts[2]), parseInt(bdayParts[1]) - 1, parseInt(bdayParts[0]));
      const today = new Date();

      const age = today.getFullYear() - bday.getFullYear();
      appdata[id].age = age;

      // send back response
      response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
      response.end("successfully updated entry")
    } else {

      // if invalid id send error back
      response.writeHeader( 404 )
      response.end( "404 Error: Entry Not Found" )
    }

  })
}



/**
 * helper function for GET to send files
 * @param {*} response the server response
 * @param {*} filename the file name to return
 */
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



/**
 * helper function for GET to send data
 * @param {*} response the server response
 */
const sendData = function( response ) {

  // add data to response
  response.writeHeader( 200, { "Content-Type": "Text" })
  response.end(JSON.stringify(appdata));

}



/**
 * function to reset IDs after data changes, each id is just the position of each entry in the list of data
 */
const resetIDs = async function() {
  const len = appdata.length;
  for(let i = 0; i < len; i++) {
    var cur = appdata[i];
    cur.id = i;
  }
}

server.listen( process.env.PORT || port )
