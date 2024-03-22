const { send } = require("process")

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
  { "val1": 2, "val2": 2, "op": "+", "output" : 4, "guess" : null},
  { "val1": 3, "val2": 5, "op": "*", "output" : 15, "guess" : null},
  { "val1": 10, "val2": 5, "op": "-", "output" : 5, "guess" : null},
  { "val1": 36, "val2": 2, "op": "/", "output" : 18, "guess" : null},
]

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    if (request.url === "/submit") {
      handlePost( request, response ) 
    } else if (request.url === "/refresh"){
      sendData(response)
    } else if (request.url === "/delete") {
      deleteData(request, response)
    }
    
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
    let data = JSON.parse(dataString)
    console.log(data)

    let output = eval(data.val1 + data.op + data.val2) //Switch out of eval to switch case or something
    let guess = false
    if(data.guess == output){
      guess = true
    } else if (data.guess == ''){
      guess = null
    }
    
    appdata.push({val1: parseInt(data.val1), val2: parseInt(data.val2), op: data.op, output, guess})
    //console.log(appdata)
    
    sendData(response)
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

function sendData(response) {
  response.writeHead( 200, "OK", {"Content-Type": "text/json" })
  response.end(JSON.stringify(appdata))
}

function deleteData (request, response) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on("end", function(){
    data = JSON.parse(dataString)
    console.log("Index for deletion: " + data)
    let removed = appdata.splice(data, 1)
    console.log(removed)
    sendData(response)
  } )
}
