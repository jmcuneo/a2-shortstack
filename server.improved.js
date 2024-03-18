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
  { "name": "Duolian", "race": "Earth Genasi", "class": "Paladin", "modifier": "Charisma"},
  { "name": "Kaede", "race": "Wood Elf", "class": "Monk", "modifier": "Dexterity" },
  { "name": "Thaddeus Thunderclap", "race": "Gnome", "class": "Wizard", "modifier": "Intelligence"}
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
    sendFile( response, "public/index.html" )
  }else if (request.url === "/api/appdata") {
    response.writeHead(200, { "Content-Type": "application/json" });
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
    // console.log( JSON.parse( dataString ) )

    // ... do something with the data here!!!

    let myDataJSON = JSON.parse( dataString )

    let charModifier = "unknown"

    console.log("class :", myDataJSON.charclass)

    switch(myDataJSON.charclass.toString().toLowerCase()){
      case "artificer" || "wizard":
        charModifier = "Intelligence"
        break;
      case "druid" || "ranger" || "cleric":
        charModifier = "Wisdom"
        break;
      case "paladin" || "bard" || "sorcerer" || "warlock":
        charModifier = "Charisma"
        break;
      case "monk" || "rogue":
        charModifier = "Dexterity"
        break;
      case "barbarian" || "fighter":
        charModifier = "Strength"
        break;
      default:
        charModifier = "unknown"
        break;
    }

    appdata.push({"name": myDataJSON.charname, "race": myDataJSON.charrace, "class": myDataJSON.charclass, "modifier": charModifier})

    console.log(appdata)



    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end("Character Information Received")
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
