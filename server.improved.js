const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000



let data ={
  keys: ["make", "model", "year", "mpg","lateralGs", "accel"],
  mainData: [
    { "make": "toyota", "model": "corolla", "year": 1999, "mpg": 23, "lateralGs": .7, "accel": 12.0 },
    { "make": "honda", "model": "civic", "year": 2004, "mpg": 30, "lateralGs": .7, "accel": 12.0},
    { "make": "ford", "model": "taurus", "year": 1987, "mpg": 14, "lateralGs": .7, "accel": 12.0}
  ],
  averageData: {
    "avgMake": 0, "avgModel": 0, "avgYear": 0, "avgMpg": 0, "avgLateralGs": 0, "avgAccel": 0 
  },
  exists: (arr, update) => arr.find(({make, model, year}) => make === update.make.toLowerCase() && model === update.model.toLowerCase() && year == update.year),
  delete: (arr, update) => {
    const index = arr.findIndex(({make, model, year}) =>  make === update.make.toLowerCase() && model === update.model.toLowerCase() && year == update.year)
    index > -1 ? arr.splice(index, 1) : console.log("nope");
  },
  //average: (arr, obj) => arr.reduce((sum, currentVal) => sum + currentVal[obj], 0)/ arr.length,
  average: (arr, obj) => arr.reduce((sum, currentVal) => sum + (typeof currentVal[obj] === "string" ? currentVal[obj].length : currentVal[obj]), 0)/ arr.length,
  helper: (str) =>  "avg" + str.substring(0,1).toUpperCase() + str.slice(1),
  mainAvg: (self) => {
    console.log(self.keys)
    if(self.keys){
      self.keys.forEach(index => {
        console.log(index)
        self.averageData[self.helper(index)] = self.average(self.mainData, index);
      });
      
    } else {
      Object.keys(self.averageData).forEach((index)=>index=0)
      console.log("hi");
    }
  },


}

/* const parseFloats = {
  convertToNum: function(val){
    if(typeof val === 'string' && /^\d+(\.\d+)?$/.test(val)){
      return parseFloat(val);
    } else {
      return val;
    }
  },
  convertData: function(data){
    return data.map(item => {
      const convertedItem = {};
      for(const key in item){
        convertedItem[key] = this.convertToNum(item);
        
      }
      return convertedItem;
    });
  }
}; */
const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 
  switch(request.url){
    case "/":
      sendFile( response, "public/index.html" );
      break;
    case "/get-app-data":
      data.mainAvg(data);
      fs.writeFile('public/app-data.json', JSON.stringify([data.mainData, data.averageData]), (error) => {
        if (error) throw error;
      });
      sendFile(response, "public/app-data.json");
      break;
    default:
      sendFile(response,filename);

  }
  /* if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  }else{
    sendFile( response, filename )
  } */
}

const handlePost = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    console.log( dataString  )
    //console.log(parseFloats.convertData([JSON.parse( dataString )]));
    //appdata.concat(parseFloats.convertData([JSON.parse( dataString )]));
    dataString = JSON.parse(dataString);
    let update;
    switch(request.url){
      case "/submit":
        update = data.exists(data.mainData, dataString);
        if(update){
          update.mpg = dataString.mpg;
          update.lateralGs = dataString.lateralGs;
          update.accel = dataString.accel;
          console.log("hey it exists \n",update);
        }else {
          data.mainData =  data.mainData.concat(dataString);
        }
        console.log(JSON.stringify(data.mainData))
        break;
      case "/delete":
        const test = (update) => data.mainData.findIndex(({make, model, year}) =>  make === update.make.toLowerCase() && model === update.model.toLowerCase() && year == update.year)
        console.log(test(dataString))
        update = data.delete(data.mainData, dataString);
        break;
      default:
        console.log("damn!");
        break;
        
    }
      
      // ... do something with the data here!!!
    data.mainAvg(data);
    console.log(data.averageData);
    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end("test")
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
