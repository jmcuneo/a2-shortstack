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
]

var id = 0;

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

const handlePost = function( request, response ) {

	if (request.url === "/get") {
		response.writeHead( 200, "OK", {"Content-Type": "text/plain" });
		response.end(JSON.stringify(appdata));
		return;
	}

  let dataString = ""
  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
		let data = JSON.parse(dataString);
		console.log( data );
		if (request.url === "/submit") {	
			let eventDate = new Date(data.date);
			let currentDate = new Date();
			currentDate.setHours(0,0,0,0);
			
			// time between two dates. it works! but gets slightly off every time they add a leap second?
			let timeDiff = currentDate.getTime()-eventDate.getTime();
			let dateDiff = Math.round(timeDiff / (1000 * 3600 * 24));
			
			if (data.hasOwnProperty("id")) {
				var index = -1;
				for (i=0; i < appdata.length; i++) {
					if(appdata[i].id === data.id) {
						index = i;
						break;
					}
				}
				if (index != -1) {
					appdata[i] = data;
					appdata[i].dateDiff = dateDiff;
				}
				else {
					response.writeHead( 200, "OK", {"Content-Type": "text/plain" });
					response.end("failure!");
					return;
				}
				response.writeHead( 200, "OK", {"Content-Type": "text/plain" });
				response.end("modified report id" + data.id);
				return;
			}
			
			// id will always increment and never decrement. prevents race
			// conditions. i think. i hope.
			data.id = id;
			data.dateDiff = dateDiff;
			id++;

			appdata.push(data);
			response.writeHead( 200, "OK", {"Content-Type": "text/plain" });
			response.end("added report id" + id);

		}

		else if (request.url === "/delete") {
			let delid = data.delid;
			let index = -1;
			for (i =0; i < appdata.length; i++) {
				if(appdata[i].id === delid) {
					index = i;
					break;
				}
			}

			response.writeHead(200, "OK", {"Content-Type": "text/plain"});
			if (index != -1) {
				appdata.splice(index, 1);
				response.end("removed report id" + delid);
			}
			else {
				response.end("failure");
			}

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
