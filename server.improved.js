let inventoryValue = 0
let inventoryWeight = 0
const prefix = "fas fa-"

function addInventory(item)
{
  inventoryValue += parseInt(item.value);
  inventoryWeight += parseInt(item.weight);
  item.inInventory = true;
}

function delInventory(item)
{
  inventoryValue -= parseInt(item.value);
  inventoryWeight -= parseInt(item.weight);
  item.inInventory = false;
}

const getInventory = function( request, response ) 
{
  
  const data = { inventoryValue, inventoryWeight };

  response.writeHeader( 200, { "Content-Type": "text/plain" })
  response.end(JSON.stringify(data));
}

const getResults = function( request, response ) 
{
  response.writeHeader( 200, { "Content-Type": "text/plain" })
  response.end(JSON.stringify(appdata));
}

const getResult = function(itemName, request, response ) 
{
  let result
  
  if(itemName.includes('='))
    itemName = itemName.split('=')[1]
  
  const index = appdata.findIndex(item => item.item === itemName);
  if (index!== -1) 
    result = appdata[index];
  else 
    console.log("Item not found in appdata array: " + itemName);
  
  response.writeHeader( 200, { "Content-Type": "text/plain" })
  response.end(JSON.stringify(result));
}

const http = require( "http" ),
      fs   = require( "fs" ),
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

const appdata = [
  { "item": "paperclip", "value": 1,     "weight": 1,        "inInventory": false},
  { "item": "bicycle",   "value": 50,    "weight": 120000,   "inInventory": false},
  { "item": "car-side",  "value": 20000, "weight": 1000000,  "inInventory": false},
  { "item": "guitar",    "value": 200,   "weight": 1500,     "inInventory": false},
]

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) 
{
  const itemName = request.url.split("/")[2];
  const filename = dir + request.url.slice( 1 ) 
  const requestURL = request.url.split("?")[0]
  
  if( requestURL === "/" ) 
    {sendFile( response, "public/index.html" )}
  else if (requestURL === "/getInventory")
    {getInventory( request, response )}
  else if (requestURL === "/getResults")
    {getResults( request, response )}
  else if (requestURL === "/getResult")
  {
    const itemName = request.url.split("?")[1];
    getResult(itemName, request, response )
  }
  else
  {sendFile( response, filename)}
}

function addOrModItem(dataObject)
{
  const newItem = 
  {
    item: dataObject.addOrModItem,
    value: dataObject.value,
    weight: dataObject.weight,
    inInventory: false
  }
  const index = appdata.findIndex(item => item.item === dataObject.addOrModItem);
  if (index!== -1) 
    appdata[index] = newItem;
  else 
    appdata.push(newItem)
}

function delItemFromPool(dataObject)
{
  const itemToDelete = dataObject.delItem;
  const index = appdata.findIndex(item => item.item === itemToDelete);
  if (index!== -1) 
    appdata.splice(index, 1);
  else 
    console.log("Item not found in appdata array: " + itemToDelete);
}

function moveIcon(dataObject, key)
{
  let object = dataObject[key];
  object = object.substring(prefix.length);
  const item = appdata.find(obj => obj.item === object); 
  if (item)
    if(key === "addIcon")
      addInventory(item)
    else if(key === "delIcon")
      delInventory(item)
}

const handlePost = function( request, response ) {
  let dataString = ""
  request.on( "data", function( data ) {
      dataString += data 
  })
  
  request.on( "end", function() {
    const dataObject = JSON.parse(dataString);
    const key = Object.keys(dataObject)[0];
    
    if(key === "addOrModItem")
      addOrModItem(dataObject)
    else if (key === "delItem")
      delItemFromPool( dataObject)
    else
      moveIcon(dataObject, key)

    response.writeHeader( 200, { "Content-Type": "text/plain" })
    response.end()
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

server.listen( process.env.PORT || port );