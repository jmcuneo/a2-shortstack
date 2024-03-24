const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000,
      appdata = [];

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
  }
    else if (request.url === '/getPreviousResults'){
      response.writeHead(200, {'Content-Type': "application/json"})
      response.end(JSON.stringify(appdata))
    }
    else {
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    //console.log( JSON.parse( dataString ) )
    const clientData = JSON.parse(dataString)

    if(clientData.operation === 'addition'){   //add functionality
      const result = parseFloat(clientData.num1) + parseFloat(clientData.num2)    //add the two imputted numbers together
      saveResult(result)    //record the reult to display to the user on the front end
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ result: result}))
    }
      else if(clientData.operation === 'subtract'){   //subtraction functionality
        const result = parseFloat(clientData.num1) - parseFloat(clientData.num2)    //add the two imputted numbers together
        saveResult(result)    //record the reult to display to the user on the front end
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ result: result}))
      }
      else if(clientData.operation === 'multiply'){   //multiplication functionality
        const result = parseFloat(clientData.num1) * parseFloat(clientData.num2)    //add the two imputted numbers together
        saveResult(result)    //record the reult to display to the user on the front end
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ result: result}))
      }
      else if(clientData.operation === 'divide'){   //division functionality
        const result = parseFloat(clientData.num1) / parseFloat(clientData.num2)    //add the two imputted numbers together
        saveResult(result)    //record the reult to display to the user on the front end
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ result: result}))
      }
      else{
        response.writeHead(200, { 'Content-Type': 'text/plain' })
        response.end('Error: Operation could not be completed')
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

server.listen( process.env.PORT || port )

const saveResult = function(operation, result){

  appdata.push({operation: operation, result: result})

}