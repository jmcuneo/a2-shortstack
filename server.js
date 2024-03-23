const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      anagram = require("./anagram"),
      dir  = "public/",
      port = 3000

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }
})

var maxId = 0;
const appdata = [];

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    let data = JSON.parse(dataString);
    var type = data.type;
    //TODO: Make this handle different url's rather than the type data
    switch(type){
      case "anagram":
        handleNewEntry(response,data);
        break;
      case "remove":
        handleRemove(response,data);
        break;
      case "getAll":
        handleGetAll(response,data);
        break;
    }
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
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

const handleNewEntry = function(response,data){
  var string = data.string;
  var anagrams = anagram.getAnagrams(string,4);
  //Send this back as a unique identifier, which will allow the client to delete entries.
  let nextData = {
    id:maxId,
    string:string,
    gram0:anagrams[0],
    gram1:anagrams[1],
    gram2:anagrams[2],
    gram3:anagrams[3]
  };
  maxId++;
  appdata.push(nextData);
  console.log(anagrams);

  response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
  response.end(JSON.stringify(nextData));
}

const handleRemove = function(response, data){
  var removeVal = data.index;
  for(let i = 0; i < appdata.length; i++){
    //TODO: Check that this handles data that's already been removed. It should, but check.
    if(appdata[i].id === removeVal){
      appdata.splice(i,1);
      break;
    }
  }
  response.writeHead( 200, "OK", {"Content-Type": "text/plain" });
  response.end(JSON.stringify({index:data.index}));
}

const handleGetAll = function(response,data){
  response.writeHead( 200, "OK", {"Content-Type": "text/plain" });
  response.end(JSON.stringify(appdata));
}

server.listen( process.env.PORT || port )
