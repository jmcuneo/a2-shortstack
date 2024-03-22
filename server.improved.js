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
  else if(request.method === "DELETE"){
    handleDelete(request, response)
  }
  else if(request.method === "PUT"){
    handlePut(request, response)
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
  else if(request.url === "/send_again"){
    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end(JSON.stringify(billingData))
  }
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ""
  let totalPrice = 0
  let discount = 0
  let afterDiscount = 0
  let finalPrice = 0
  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    //console.log( JSON.parse( dataString ) )
    let bilingObj = JSON.parse(dataString)
    totalPrice = bilingObj.cost*bilingObj.quantity

    //calculating discount
    if(totalPrice > 50){
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

    afterDiscount = discount*totalPrice
    finalPrice = totalPrice - afterDiscount //final price including quantity

    bilingObj.totalprice = totalPrice
    bilingObj.discount = discount
    bilingObj.afterdiscount = finalPrice

    billingData.push(bilingObj)

    // ... do something with the data here!!!

    console.log(billingData)

    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    // if(billingData.length > 1){
    //   console.log(billingData[billingData.length-1])
    //   response.end(JSON.stringify(billingData[billingData.length-1]))
    // }
    // else{
      response.end(JSON.stringify(billingData))
    //}

  })
}

const handleDelete = function( request, response ) {
  let dataString = ""
  console.log(request.url.split('/')[1])
  //let index = request.url.split('/')[1]
  request.on( "data", function( data ) {
    dataString += data
  })

  request.on( "end", function() {
    //console.log("hi")
    let payload =  JSON.parse( dataString )
    //console.log("payload = "+dataString)

    billingData.splice(payload.index, 1)
    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end(JSON.stringify(billingData))

  })
}

const handlePut = function( request, response ) {
  let dataString = ""
  let totalPrice = 0
  let discount = 0
  let afterDiscount = 0
  let finalPrice = 0
  request.on( "data", function( data ) {
    dataString += data
  })

  request.on( "end", function() {
    //console.log( JSON.parse( dataString ) )
    let bilingObj = JSON.parse(dataString)
    totalPrice = bilingObj.cost*bilingObj.quantity

    //calculating discount
    if(totalPrice > 50){
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

    afterDiscount = discount*totalPrice
    finalPrice = totalPrice - afterDiscount //final price including quantity

    bilingObj.totalprice = totalPrice
    bilingObj.discount = discount
    bilingObj.afterdiscount = finalPrice

    //billingData.splice(bilingObj.updindex, 0, bilingObj)
    billingData[bilingObj.updindex] = bilingObj
    //billingData.push(bilingObj)

    // ... do something with the data here!!!

    console.log(billingData)

    //let updload =  JSON.parse( dataString )
    //console.log("payload = "+dataString)



    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end(JSON.stringify(billingData))

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
