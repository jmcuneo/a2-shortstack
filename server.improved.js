const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

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
    const clientData = JSON.parse(dataString)
    console.log(clientData)

    const operation = clientData.operation,   //extracting the operation from clientData
    num1 = parseFloat(clientData.num1),       //extracting the first number from clientData
    num2 = parseFloat(clientData.num2)        //extracting the second number from clientData

    if(operation === "addition"){   //add functionality
      const result = (num1 + num2).toFixed(2)    //add the two imputted numbers together

      const responseData = { result: result }
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(responseData))
    }
    
      else if(operation === "subtract"){   //subtraction functionality
      const result = (num1 - num2).toFixed(2)    //subtract the two imputted numbers together

      const responseData = { result: result }
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(responseData))
    }
      else if(operation === "multiply"){   //multiplication functionality
      const result = (num1 * num2).toFixed(2)    //multiply the two imputted numbers together

      const responseData = { result: result }
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(responseData))
    }
      else  if(operation === "divide"){   //division functionality
      const result = (num1 / num2).toFixed(2)    //divide the two imputted numbers together

      const responseData = { result: result }
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(responseData))
    }
      
      else{
        response.writeHead(400, { 'Content-Type': 'text/plain' })
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
