const http = require( "http" ),
      fs   = require( "fs" ),
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

const appdata = [
  { "Part": "Spinner", "Material": "Steel", "Quantity": 1, "Weight": 0.702084 },
  { "Part": "Back Plate", "Material": "Aluminum", "Quantity": 1, "Weight": 0.0380388 },
  { "Part": "Uprights", "Material": "UHML", "Quantity": 2, "Weight": 0.0871949} 
]

/* A function that calls the correct handler based on request type (GET or POST) */
const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }
})

/* 
 * A function that handles all GET requests sent to the server based on request URL
 * and calls the associated send function (file or array)
 */
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

/* 
 * A function that handles all POST requests sent to the server based on request data
 * and changes the array based on the request type
 */
const handlePost = function( request, response ) {
  let dataString = ""

  request.on("data", function(data){
      dataString += data 
  })

  request.on( "end", function() {
    var entry = JSON.parse(dataString)
    entry_index = indexOfPartName(entry.part_name, appdata)

    //Add or modify request
    if(entry.type === "add"){
      new_quantity = parseInt(entry.new_quantity)
      weight_per_unit = parseFloat(entry.weight_per_unit)
      new_entry = {"Part": entry.part_name, "Material": entry.new_material, 
      "Quantity": entry.new_quantity, "Weight": entry.weight_per_unit * entry.new_quantity}

      //Add entry because index is out of bounds for array (not found)
      if(entry_index == appdata.length && (new_quantity > 0 && weight_per_unit > 0)){
        appdata.push(new_entry)
      //Modify entry because entry is in appdata
      }else if(new_quantity > 0 && weight_per_unit > 0){
        appdata.splice(entry_index, 1, new_entry)
      }
    //Remove request
    }else{
      appdata.splice(entry_index, 1)
    }
    console.log(appdata)
    response.writeHeader( 200, "OK", {"Content-Type": "text/plain"})
    response.end("Appdata modified")
  })
}

/* 
 * A function that locates part_name in the specified array arr
 * @return: index of located element or arr.length if the element is not found
 */
function indexOfPartName(part_name, arr){
  for(let i = 0; i < arr.length; i++){
    if(arr[i].Part === part_name){
      return i;
    }
  }
  return arr.length;
}

/* A function that send the requested file to the client to fulfill a GET request */
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

/* A function that sends the array arr to the client to fulfill a GET request */
const sendArr = function(response, arr){
  response.writeHeader(200, "OK", {"Content-Type": "text/plain"})
  response.end(JSON.stringify(arr))
}

server.listen( process.env.PORT || port )
