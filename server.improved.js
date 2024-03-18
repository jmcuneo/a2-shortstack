const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

var appdata = [
  {
    "name":"undertale",
    "gram0":"nude alert",
    "gram1":"unrelated",
    "gram2":"delta rune",
    "gram3":"nut dealer",
    "gram4":"elate rund"
  }
];

const dictionary = fs.readFileSync("dictionary.txt").split("\n");
/*
  Anagram algorithm:
    Filter dictionary, removing words that it cannot form. 
      Maybe remove this because it's covered by DFS
    Shuffle filtered dictionary
    do a DFS search through the list. 
      Keep track of which letters remain
      If you find a word that works, add it and go down another layer. Start looking for another
      If you get to the end of the dict with no words, go back up a layer.
      To make things more interesting... possibly
        perhaps prioritize words of higher length? Put them earlier in the list so they'll be chosen more?
*/

const letters = new Set("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""))
function getLetterData(string){
  
}

//letter data is an object of letter:num occurrences
function getAnagramWord(letterData){

}

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }
})

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
    console.log( JSON.parse( dataString ) )

    // ... do something with the data here!!!
    // Make a random anagram of the name?

    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end("test")
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
