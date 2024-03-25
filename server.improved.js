const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "src/",
      port = 3000

const appdata = [
  { "date": "January 2024", "rent": 500, "util": 200, "food": 300, "other": 400, "total": 1400 },
  { "date": "February 2024", "rent": 500, "util": 190, "food": 290, "other": 399, "total": 1379 },
  { "date": "March 2024", "rent": 500, "util": 210, "food": 280, "other": 398, "total": 1388 }
]

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
    sendFile( response, "src/index.html" )
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
    if (dataString.length !== 0) {
      const input = JSON.parse( dataString );

      appdata.push({
        "date": input.date,
        "rent": parseInt(input.rent),
        "util": parseInt(input.util),
        "food": parseInt(input.food),
        "other": parseInt(input.other),
        "total": parseInt(input.rent) + parseInt(input.util) + parseInt(input.food) + parseInt(input.other)
      });
    }

    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end(JSON.stringify(appdata))
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
