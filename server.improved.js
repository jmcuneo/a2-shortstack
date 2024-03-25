const http = require( "http" ),
    fs   = require( "fs" ),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library if you"re testing this on your local machine.
    // However, Glitch will install it automatically by looking in your package.json
    // file.
    mime = require( "mime" ),
    dir  = "public/",
    port = 3000

const appdata = []

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )
  }else if( request.method === "POST" ){
    handlePost( request, response )
  }else if (request.method === "DELETE") {
    deletePost(request, response)
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 )
  if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  }
  else if (request.url === "/get_workouts"){
    response.end(JSON.stringify(appdata));
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
    const jsonObj = (JSON.parse(dataString));

    if (jsonObj.type === "edit") {
      const id  = request.url.substring(1);
      appdata[id].title = jsonObj.title;
      appdata[id].description = jsonObj.description;
    } else {
      // ... do something with the data here!!!
      // Create a Date/Time of when the thing is created
      let time = new Date();
      let timeString = String(time.getMonth() + 1) + "/" + String(time.getDate()) + " " + String(time.getHours()) + ":" + String(time.getMinutes());
      jsonObj.time = timeString;
      appdata.push(jsonObj);

      response.writeHead( 200, "OK", {"Content-Type": "text/plain" });
      response.end((JSON.stringify(jsonObj)));
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

const deletePost = function (response) {
  const id  = response.url.substring(1);
  appdata.splice(id,1);
}


server.listen( process.env.PORT || port )