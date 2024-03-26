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
/**
 * This function handles the GET requests. It sends the index.html file to the client.
 * @param request The request object
 * @param response The response object
 */
const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 )

  if( request.url === "/" ) {
    sendFile( response, "public/index.html" );
  }
  else if( request.url === "/display" ){
      response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
      response.end(JSON.stringify(details))
  }
  else{
    sendFile( response, filename )
  }
}

/**
 * This function handles the POST requests. It reads the data from the POST request
 * and sends it to the console. It then sends a response back to the client.
 * @param request The request object
 * @param response The response object
 */

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
/**
 * This function handles the PUT requests.
 * @param request The request object
 * @param response The response object
 */
const handlePut = function( request, response ) {
        let dataString = ""
        request.on( "data", function( data ) {
            dataString += data
        })
        request.on( "end", function() {
            console.log( JSON.parse( dataString ) )
            let save = JSON.parse(dataString)
            for(let i=0;i<details.length;i++){
                if(details[i].FirstName===save.FirstName && details[i].LastName===save.LastName){
                    details[i]=save;
                    details[i].cost=cost(save.Transport);
                    break;
                }
            }
            response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
            response.end(JSON.stringify(details))
        })
}
/**
 * This function handles the DELETE requests.
 * @param request The request object
 * @param response The response object
 */
const handleDelete = function(request, response){
    let dataString = ""
    request.on( "data", function( data ) {
        dataString += data
    })

    request.on( "end", function() {
        let index=JSON.parse(dataString)
        details.splice(index, 1)
        response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
        response.end(JSON.stringify(details))
    })

}

/**
 * Implemented to demonstrate server logic and derived field baseline requirement.
 * This function calculates the cost of the trip based on the mode of transport.
 * @param Transport
 * @returns {number}
 */
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

/**
 * This function sends the file to the client. If the file is not found, it sends a 404 error.
 * @param response
 * @param filename
 */
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
