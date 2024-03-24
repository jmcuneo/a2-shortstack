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
  { "Part": "Spinner", "Material": "Steel", "Quantity": 1, "Weight": 0.702084 },
  { "Part": "Back Plate", "Material": "Aluminum", "Quantity": 1, "Weight": 0.0380388 },
  { "Part": "Uprights", "Material": "UHML", "Quantity": 2, "Weight": 0.0871949} 
]

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice(1)
  if(request.url === "/") {
    sendFile(response, "public/index.html")
  }else if(request.url === "/getarr"){
    sendArr(response, appdata)
  }else{
    sendFile(response, filename)
  }
}

const handlePost = function( request, response ) {
  let dataString = ""

  request.on("data", function(data){
      dataString += data 
  })

  request.on( "end", function() {
    var entry = JSON.parse(dataString)
    entry_index = arrayIndexOf(entry.part_name, appdata)
    if(entry.type === "add"){
      new_quantity = parseFloat(entry.new_quantity)
      weight_per_unit = parseFloat(entry.weight_per_unit)
      new_entry = {"Part": entry.part_name, "Material": entry.new_material, 
      "Quantity": entry.new_quantity, "Weight": entry.weight_per_unit * entry.new_quantity}
      if(entry_index == appdata.length && (new_quantity > 0 && weight_per_unit > 0)){
        appdata.push(new_entry)
      }else if(new_quantity > 0 && weight_per_unit > 0){
        appdata.splice(entry_index, 1, new_entry)
      }
    }else{
      appdata.splice(arrayIndexOf(entry.part_name, appdata), 1)
    }
    console.log(appdata)
    response.writeHead( 200, "OK", {"Content-Type": "text/plain"})
    response.end("test")
  })
}

function arrayIndexOf(part_name, arr){
  for(let i = 0; i < arr.length; i++){
    if(arr[i].Part === part_name){
      return i;
    }
  }
  return arr.length;
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
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

const sendArr = function(response, arr){
  response.writeHeader(200, "Fetched Table")
  response.end(JSON.stringify(arr))
}

server.listen( process.env.PORT || port )
