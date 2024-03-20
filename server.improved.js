const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

// const appdata = [
//   { "model": "toyota", "year": 1999, "mpg": 23 },
//   { "model": "honda", "year": 2004, "mpg": 30 },
//   { "model": "ford", "year": 1987, "mpg": 14}
// ]

let billingData = []

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
  else if(request.url === "/instructions"){
    sendFile( response, "public/instructions.html" )
  }
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ""
  let discount = 0
  let afterDiscount = 0
  let finalPrice = 0
  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    //console.log( JSON.parse( dataString ) )
    const bilingObj = JSON.parse(dataString)

    //calculating discount
    if(bilingObj.cost > 50){
      discount = 0.10 //10%
    }
    else if(bilingObj.cost <= 50 && bilingObj.cost > 100){
      discount = 0.20 //20%
    }
    else if(bilingObj.cost <= 100 && bilingObj.cost > 500){
      discount = 0.30 //30%
    }
    else if(bilingObj.cost >= 500){
      discount = 0.40 //40%
    }

    afterDiscount = discount*bilingObj.cost
    finalPrice = (bilingObj.cost - afterDiscount)*bilingObj.quantity //final price including quantity

    // ... do something with the data here!!!
    billingData.push(JSON.parse( dataString ))
    console.log(bilingObj.cost)

    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end(JSON.stringify(dataString))
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
