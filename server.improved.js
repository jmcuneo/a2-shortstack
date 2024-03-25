const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000
let details=[];
let inputCost={};
const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )
  }else if( request.method === "POST" ){
    handlePost( request, response )
  }
  else if( request.method === "DELETE" ){
    handleDelete( request, response )
  } else if ( request.method === "PUT" ) {
    handlePut( request, response );
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 )

  if( request.url === "/" ) {
    sendFile( response, "public/index.html" );
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
    inputCost=JSON.parse(dataString)
    inputCost.cost=cost(inputCost.Transport);
    details.push(inputCost)
    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end(JSON.stringify(details))
  })
}
const handlePut = function( request, response ) {
    let dataString = ""
    request.on( "data", function( data ) {
        dataString += data
    })

    request.on( "end", function() {
        console.log( JSON.parse( dataString ) )
        let save = JSON.parse(dataString)
        details[save] =
        response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
        response.end(JSON.stringify(details))
    })
}
const handleDelete = function(request, response){
    let dataString = ""
    request.on( "data", function( data ) {
        dataString += data
    })

    request.on( "end", function() {
        console.log( JSON.parse( dataString ) )
        let index=JSON.parse(dataString)
        details.splice(index, 1)
        console.log(details)
        response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
        response.end(JSON.stringify(details))
    })

}
function cost(Transport){
    switch (Transport){
        case 'Lyft':
            return 50;
            break;
        case 'Uber':
            return 45;
            break;
        case 'PeterPan Bus':
            return 35;
            break;
        case 'Greyhound Bus':
            return 35;
            break;
        case 'Our Bus':
            return 30;
            break;
        case 'Subway':
            return 5;
            break;
        case 'Commuter Rail':
            return 12;
            break;
        default:
            return 0;
    }
    return 10;
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
