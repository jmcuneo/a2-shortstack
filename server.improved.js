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
  {"Id": 1, "model": "toyota", "year": 1999, "mpg": 23, "fuelLoad": 12, "tillEmpty": 23*12},
  {"Id": 2, "model": "honda", "year": 2004, "mpg": 30,"fuelLoad": 15, "tillEmpty": 30*15 },
  {"Id": 3, "model": "ford", "year": 1987, "mpg": 14,"fuelLoad": 10,"tillEmpty": 14*10  } // 0 is placeholder
]

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }
  else if( request.method === "DELETE" ){
    handleDelete( request, response )
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 )

  if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  } else if(request.url === "/data"){
    let dataString = ""

    request.on( "data", function( data ) {
      dataString += data
    })

    request.on( "end", function() {
      // ... do something with the data here!!!
      console.log("made it here")

      //console.log(typeof Object.values(JSON.parse( dataString ))[0] === 'string')
      console.log(appdata)
      var jsonArray = JSON.stringify(appdata)
      response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
        response.end(jsonArray)
    })
  }
  else{
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
    console.log("made it here")

    if(isNaN(parseInt(Object.values(JSON.parse( dataString ))[1])) ||
        isNaN(parseInt(Object.values(JSON.parse( dataString ))[2])) ||
        isNaN(parseInt(Object.values(JSON.parse( dataString ))[3]))
    ){
      console.log("it broke")
    } else{
      appdata.push({ "model": Object.values(JSON.parse( dataString ))[0],
        "year": parseInt(Object.values(JSON.parse( dataString ))[1]),
        "mpg": parseInt(Object.values(JSON.parse( dataString ))[2]),
      "fuelLoad": parseInt(Object.values(JSON.parse( dataString ))[3]),
      "tillEmpty": parseInt(Object.values(JSON.parse( dataString ))[2]) *
          parseInt(Object.values(JSON.parse( dataString ))[3])})
    }

    //console.log(typeof Object.values(JSON.parse( dataString ))[0] === 'string')
    console.log(appdata)
    var jsonArray = JSON.stringify(appdata)
    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end(jsonArray)
  })
}

const handleDelete = function(request, response){
  let dataString = ""

  request.on( "data", function( data ) {
    dataString += data
  })

  request.on( "end", function() {
    console.log( JSON.parse( dataString ) )

    // ... do something with the data here!!!
    console.log("made it here to delete")

    if(isNaN(parseInt(Object.values(JSON.parse( dataString ))[2])) ||
        isNaN(parseInt(Object.values(JSON.parse( dataString ))[3])) ||
        isNaN(parseInt(Object.values(JSON.parse( dataString ))[4]))
    ){
      console.log("it broke")
    } else{
      for(let i = 0; i < appdata.length; i++){ //TODO Make a delete that does one item at a time
        if(Object.values(JSON.parse( dataString ))[0] === appdata[i].model &&
            parseInt(Object.values(JSON.parse( dataString ))[1]) === appdata[i].year &&
            parseInt(Object.values(JSON.parse( dataString ))[2]) === appdata[i].mpg){
          appdata.splice(i, 1);
        }
      }
    }

    //console.log(typeof Object.values(JSON.parse( dataString ))[0] === 'string')
    console.log(appdata)
    var jsonArray = JSON.stringify(appdata)
    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end(jsonArray)
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
