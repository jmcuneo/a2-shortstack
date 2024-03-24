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
  { "Name": "think about toyota", "Description": "not to be confused with toy yoda", "Creation Date": "2024-03-13", "Priority": 1, "Recommended Deadline": "2024-03-14"},
  { "Name": "discuss honda", "Description": "honk honk", "Creation Date": "2024-03-13", "Priority": 2, "Recommended Deadline": "2024-03-15"},
  { "Name": "get a chicken", "Description": "i need a chicken so bad", "Creation Date": "2024-03-13", "Priority": 3, "Recommended Deadline": "2024-03-16"} 
]

// Write appdata to JSON file
function writeData() {
  fs.writeFileSync("public/data.json", JSON.stringify(appdata), err => {
    if (err) throw err;
    console.log("Data written to file");
  });
}
writeData();


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
    console.log(JSON.parse(dataString))

    // If the request is to submit data, parse the data and add it to the appdata array
    if (request.url === "/submit") {
      let data = JSON.parse(dataString);
      // Check if the data already exists in the array. If it is, return an error
      for (let i = 0; i < appdata.length; i++) {
        if (appdata[i].Name === data.Name) {
          response.writeHead( 400, "Name already exists", {"Content-Type": "text/plain" })
          response.end("Name already exists");
          return
        }
      }
      
      // Derive the recommended deadline from the priority and creation date
      let date = new Date(data["Creation Date"]);
      let recommendedDeadline = new Date(date);
      recommendedDeadline.setDate(date.getDate() + +data.Priority);
      data["Recommended Deadline"] = recommendedDeadline.toISOString().slice(0, 10);


      appdata.push(data);
      writeData();
      response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
      response.end("Data submitted successfully");
      
    }

    // If the request is to delete data, parse the data and delete the data from the appdata array
    if (request.url === "/delete") {
      let data = JSON.parse(dataString);
      let found = false;
      // Look in array for data with the same name and remove it
      for (let i = 0; i < appdata.length; i++) {
        if (appdata[i].Name === data.Name) {
          found = true;
          appdata.splice(i, 1);
          break;
        }
      }
      writeData();
      if (found) {
        response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
        response.end("Data deleted successfully");
      } else {
        response.writeHead( 400, "Name not found", {"Content-Type": "text/plain" })
        response.end("Name not found");
      }
    }

    if (request.url === "/edit") {
      let data = JSON.parse(dataString);

      for (let i = 0; i < appdata.length; i++) {
        if (appdata[i].Name === data.Name) {
          // Derive the recommended deadline from the priority and creation date
          let recommendedDeadline = new Date(data["Creation Date"]);
          recommendedDeadline.setDate(recommendedDeadline.getDate() + +data.Priority);
          data["Recommended Deadline"] = recommendedDeadline.toISOString().slice(0, 10);
          appdata[i] = data;
          writeData();
          response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
          response.end("Data edited successfully");
          return;
        }
      }

      response.writeHead( 400, "Name not found", {"Content-Type": "text/plain" })
      response.end("Name not found");
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
