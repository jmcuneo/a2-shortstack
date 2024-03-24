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

//function checks the request made and handles accordingly
const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }
  else if(request.method === "DELETE"){
    handleDelete(request, response)
  }
  else if(request.method === "PUT"){
    handlePut(request, response)
  }
})

//function to handle GET requests
const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  //redirecting to respective html pages according to the request
  if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  }
  else if(request.url === "/instructions"){
    sendFile( response, "public/instructions.html" )
  }
  else if(request.url === "/send_again"){ //to send back data onload
    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end(JSON.stringify(billingData))
  }
  else{
    sendFile( response, filename )
  }
}

//SERVER LOGIC
function calculatePrice(bilingObj){
  let totalPrice = 0
  let discount = 0
  let afterDiscount = 0
  let finalPrice = 0
  totalPrice = bilingObj.cost*bilingObj.quantity //calculating total price based on quantity and cost

  //calculating discount based on total price
  if(totalPrice < 50){
    discount = 0.10 //10%
  }
  else if(totalPrice <= 50 && totalPrice > 100){
    discount = 0.20 //20%
  }
  else if(totalPrice <= 100 && totalPrice > 500){
    discount = 0.30 //30%
  }
  else if(totalPrice >= 500){
    discount = 0.40 //40%
  }

  afterDiscount = discount*totalPrice //applying discount
  finalPrice = totalPrice - afterDiscount //final price including quantity

  //adding properties and values for prices
  bilingObj.totalprice = totalPrice
  bilingObj.discount = discount*100
  bilingObj.afterdiscount = finalPrice

  return bilingObj

}

//function to handle POST requests
const handlePost = function( request, response ) {
  let dataString = ""
  //receives data and store in local
  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    bilingObj = calculatePrice(JSON.parse(dataString)) //receiving calculated values after server logic

    billingData.push(bilingObj) //adding object to the array to store on server

    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })

    response.end(JSON.stringify(billingData)) //returning back the data with calculations


  })
}

//function to handle DELETE request
const handleDelete = function( request, response ) {
  let dataString = ""
  //receives data and store in local
  request.on( "data", function( data ) {
    dataString += data
  })

  request.on( "end", function() {

    let payload =  JSON.parse( dataString )

    billingData.splice(payload.index, 1) //delete object in array based on index received
    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end(JSON.stringify(billingData)) //send back updated data

  })
}


//function to handle PUT requests
const handlePut = function( request, response ) {
  let dataString = ""
  //receives data and store in local
  request.on( "data", function( data ) {
    dataString += data
  })

  request.on( "end", function() {
    bilingObj = calculatePrice(JSON.parse(dataString)) //re-calculate

    billingData[bilingObj.updindex] = bilingObj //replace the updated object using the index

    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end(JSON.stringify(billingData)) //send back updated data
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
