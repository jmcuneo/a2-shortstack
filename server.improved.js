const http = require( "http" ),
    fs   = require( "fs" ),
    mime = require( "mime" ),
    dir  = "public/",
    port = 3000

// Array to store postcards
let postcards = [];

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
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function (request, response) {
  if (request.url === "/save-postcard") {
    console.log("save-postcard check");

    let dataString = "";

    request.on("data", function (data) {
      dataString += data;
    });

    request.on("end", function () {
      try {
        const postData = JSON.parse(dataString);
        console.log("Received data:", postData);
        postcards.push(postData);

        response.writeHead(200, "OK", { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Postcard saved successfully!" }));

      } catch (error) {
        console.error("Error parsing JSON:", error);
        // sendding error only if JSON parsing fails
        response.writeHead(400, { "Content-Type": "text/plain" });
        response.end("Error: Invalid JSON data");
      }
    });
  } else {
    // not necessary rn
  }
};


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
