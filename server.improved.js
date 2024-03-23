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
  { "model": "toyota", "year": 1999, "mpg": 23 },
  { "model": "honda", "year": 2004, "mpg": 30 },
  { "model": "ford", "year": 1987, "mpg": 14} 
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
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
    if(request.url === '/submit'){
        let dataString = ""

        request.on("data", function (data) {
            dataString += data
        })

        request.on("end", function () {
            console.log(JSON.parse(dataString))
            response.writeHead(200, "OK", {"Content-Type": "text/plain"})
            response.end("test")
        })
    }
    if(request.url === '/public/index.html'){
        let dataString = "";

        request.on("data", function (data) {
            dataString += data;
        });
        request.on("end", function () {
           // console.log(appdata)
            response.writeHead(200, "OK", {"Content-Type": "text/plain"})
            response.end(JSON.stringify(appdata))})}}
      //   const html = `
      // <html lang="en">
      //   <head>
      //   <meta charset="UTF-8">
      //   </head>
      //   <body>
      //   <head>
      //   <tr>AppData:<br> </tr>
      //   </head>
      //   <tbody>
      //   ${appdata.map(item => JSON.stringify(item))}
      //   </tbody>
      //   </body>
      //   </html>
      // `
      // response.writeHead(200, "OK", {"Content-Type": "text/plain"})
      // response.end(html)


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
