const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

var currentID = 4

var people = [
  { "id": 1, "firstName": "Mark", "lastName": "Stevenson", "age": 23, "fullName": "Mark Stevenson" },
  { "id": 2, "firstName": "Tom", "lastName": "Sanford", "age": 30, "fullName": "Tom Sanford" },
  { "id": 3, "firstName": "Steve", "lastName": "Smith", "age": 14, "fullName": "Steve Smith" } 
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
  } else if (request.url === "/getPeople") {
    response.end(JSON.stringify(people));
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
    // ... do something with the data here!!!
    let url = request.url;
    let data = JSON.parse( dataString )

    if(url == "/submitAdd"){
      let fullName = data.firstName+" "+data.lastName
      people.push({id: currentID, firstName: data.firstName, lastName: data.lastName, age: data.age, fullName: fullName})
      currentID = currentID + 1
    } else if (url == "/submitRemove") {
      for (let index = 0; index < people.length; index++){
        if (people[index].id == data.id){
          people.splice(index,1)
          break
        }
      }
    }
    
    console.log(people);
    console.log(url);


    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end(data.firstName)
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
