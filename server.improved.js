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
  {
    taskName: "Review Code Changes",
    priority: 3,
    creation_date: "2024-03-18",
    days_not_done: 0,
  },
  {
    taskName: "Schedule Team Meeting",
    priority: 2,
    creation_date: "2024-03-10",
    days_not_done: 8,
  }
]

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response )
  }else if( request.method === "PUT" ){
    handlePut( request, response )
  }else if( request.method === "DELETE" ){
    handleDelete( request, response )
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  } else if ( request.url === "/tasks" ) {
    response.writeHead( 200, "OK", {"Content-Type": "application/json"})
    response.end( JSON.stringify( appdata ) )
  } else {
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  if( request.url !== "/tasks" ) {
    return
  }

  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    // console.log( JSON.parse( dataString ) )

    // ... do something with the data here!!!
    const task = JSON.parse( dataString )
    task.days_not_done = Math.floor((new Date() - new Date(task.creation_date)) / (1000 * 60 * 60 * 24))

    appdata.push( task )
    console.log( appdata )

    response.writeHead( 200, "OK", {"Content-Type": "application/json"})
    response.end( JSON.stringify( appdata ) )
  })
}

const handlePut = function( request, response ) {
  if( request.url !== "/tasks" ) {
    return
  }

  let dataString = ""

  request.on( "data", function( data ) {
    dataString += data
  })

  request.on( "end", function() {
    // console.log( JSON.parse( dataString ) )

    // ... do something with the data here!!!
    const json = JSON.parse( dataString )
    const task = {
      taskName: json.taskName,
      priority: json.priority,
      creation_date: json.creation_date,
      days_not_done: Math.floor((new Date() - new Date(json.creation_date)) / (1000 * 60 * 60 * 24)),
    }

    appdata[json.index] = task
    // console.log( appdata )

    response.writeHead( 200, "OK", {"Content-Type": "application/json"})
    response.end( JSON.stringify( appdata ) )
  })
}

const handleDelete = function( request, response ) {
  if( request.url !== "/tasks" ) {
    return
  }

  let dataString = ""

  request.on( "data", function( data ) {
    dataString += data
  })

  request.on( "end", function() {
    // console.log( JSON.parse( dataString ) )

    // ... do something with the data here!!!
    const info = JSON.parse( dataString )
    appdata.splice( info.index, 1 )
    console.log( appdata )

    response.writeHead( 200, "OK", {"Content-Type": "application/json"})
    response.end( JSON.stringify( appdata ) )
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
