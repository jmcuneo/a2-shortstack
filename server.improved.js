const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

let appdata = []

function sortData() {
  const MS_TO_HOURS = 1000 * 60 * 60;

  // Rank with priority first. Then, smaller the number, the greater the priority
  const priorities = {
    'verylow': 1,
    'low': 2,
    'medium': 3,
    'high': 4,
    'veryhigh': 5
  };
  
  appdata.sort((a, b) => {
    let priorityDifference = priorities[b.priority] - priorities[a.priority];
    if (priorityDifference !== 0) {
      return priorityDifference;
    }
    // They have the same priority, so sort by date instead
    return Math.floor((new Date(b.duedate).getTime() - new Date(a.duedate).getTime()) / MS_TO_HOURS);
  });

  // Update recommended order
  for (let i = 0; i < appdata.length; i++) {
    appdata[i].ordernum = i;
  }
}

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
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    let newData = JSON.parse(dataString);
    // The page was loaded. Send the data.
    if (newData.method === "load") {
      console.log("Data requested");
      response.writeHead(200, "OK", {"Content-Type": "application/json"});
      response.end(JSON.stringify(appdata));
      console.log("Data sent");
      return;
    }

    // Clear the data
    if (newData.method === "clear") {
      appdata = [];
      console.log("Cleared data!");
      response.writeHead( 200, "OK", {"Content-Type": "text/plain" });
      response.end("Data cleared!");
      return;
    }

    // Edits the existing value if the name is already there
    for (let i = 0; i < appdata.length; i++) {
      if (appdata[i].taskname === newData.taskname) {
        newData.ordernum = appdata[i].ordernum;
        // Replace the existing value in appdata with the new data
        appdata.splice(i, 1, newData);
        sortData();

        console.log("Updated data!");
        response.writeHead(200, "OK", {"Content-Type": "application/json"});
        response.end(JSON.stringify(appdata));
        return;
      }
    }

    // Update all the order nums
    appdata.push(newData);
    sortData();

    // // Return the new table
    response.writeHead(200, "OK", {"Content-Type": "application/json"});
    response.end(JSON.stringify(appdata));
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
