const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

//for derived field, we can do the following
//given the score value and the parameters of the score itself, we can generate a number
//ranging from 0 to 100, which corresponds to a letter Grade
//the parameters can limit the max value of the number grade
//so derived fields are as follows
/*
- numScoreLim (generated upon updating the parameter values)
    --derived from the new parameteres
-scoreScalingFactor (default and max of 1, made alongside numScoreLim, lower values=more base score needed for better grade
in turn, scores should be updated
the following params can be modified
all
-the delay btwn each image
gr
-the chance for an image to be red
speed
mem
-time to enter correct sequence
*/
var testParams={//contains the
    gr:[],
    spd:[],
};
var bestRun=[0,0,0];
var currentRun=[0,0,0];
const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {

    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 
    console.log(filename);
    if (request.body==="LINK"){
        getImgLink(response,filename);
    }
  else if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  }else{
    sendFile( response, filename )
  }
}
const getImgLink=function( response, filename ){
   const type = mime.getType( filename )

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we"ve loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { "Content-Type": type })
       response.end( filename )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( "404 Error: File Not Found" )

     }
   })
}
//What get requests should do:
/*
-contains the name of the img in the url and grabs it from server
*/
const handlePost = function( request, response ) {
      request.on( "data", function( data ) {
      let str="";
      str+=data;
      if (str==="START"){
        startGame(request,response);
      }
      else if (str==="RUN"){
              getRunData
              (request,response)
            }
      else if (str==="PARAM"){
        giveParams(request,response)
      }
      else if (str==="DELETE"){
          bestRun=[0,0,0];
          getRunData(request,response);
        }
      else if (str==="EVAL"){
        finalScore(request,response);
      }

      else if (JSON.parse(str).ID!=null){
        updateScore(request,response,str);
      }
      else{
          setParams(request,response,str);
      }
      })
}

function giveParams(request,response){
      request.on( "end", function() {

        response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
        var returnVal={'grDelay':testParams.gr[0],'grChance':testParams.gr[1],
        'spdDelay':testParams.spd[0],};
        response.end(JSON.stringify(returnVal))
      })
}
function getRunData(request,response){
     request.on( "end", function() {

            response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
            var returnVal={'S1':bestRun[0],'S2':bestRun[1],
            'S3':bestRun[2],};
            response.end(JSON.stringify(returnVal))
          })
}
function finalScore(request,response){
    console.log("HELP");
    currentRun[2]=Number(currentRun[0])+Number(currentRun[1]);
    console.log("FIN");
    console.log(currentRun[0]);
    console.log(currentRun[1]);
    console.log(currentRun[2])
    if (currentRun[2]>Number(bestRun[2])){
        bestRun=currentRun;
          request.on( "end", function() {

            // ... do something with the data here!!!

            response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
            response.end("Y")
          })
    }
    else{
      request.on( "end", function() {

        // ... do something with the data here!!!

        response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
        response.end(currentRun[2])
      })
    }
}
const startGame=function(request,response){
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data
  })
  console.log(testParams);
if (testParams.gr.length==3 && testParams.spd.length==2){

  request.on( "end", function() {

    // ... do something with the data here!!!

    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end("Y")
  })
}
    else{
          request.on( "end", function() {

            // ... do something with the data here!!!

            response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
            response.end("N")
          })
    }
}
const updateScore = async function( request, response,str ){
    params=JSON.parse(str);
    console.log("SCORING");
    mult=1;
    if (str.ID==0){
        mult=testParams.gr[2]
    }
    else if(str.ID==1){
        mult=testParams.spd[1]
    }
    currentRun[params.ID]=1000*Number(params.Score)*Number(mult);
    request.on( "end", function() {
        response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end("test")
    })
}

const setParams = function( request, response,str ) {
  let dataString = str
  testParams.gr=[];
  testParams.spd=[];
  request.on( "end", function() {
    params=JSON.parse(dataString);
    console.log( JSON.parse( dataString ) )
    var scoreMult=1;
    //for each test parameter group, update stored params as well as adds a derived field which is the grade lim
    //gr
    //delay and chance
    //each 10 ms subtracted adds +1% score
    //every 5% chance added, adds a flat 0.5% score as well as additional score scaling with amt of ms subtracted
    testParams.gr.push(params.grDelay);
    testParams.gr.push(params.grChance);
    var delayRemoved=1000-Number(params.grDelay);
    var chanceAdded=Number(params.grChance)-15;
    console.log(scoreMult);
    console.log(0.01*delayRemoved/10);
    console.log(0.005*chanceAdded/5);
    scoreMult= 1+ 0.01*(delayRemoved)/10 + 0.005*(chanceAdded)/5;

    testParams.gr.push(scoreMult);

    testParams.spd.push(params.speedDelay);
    var delayRemoved=550-Number(params.speedDelay);
    scoreMult=1+0.01*delayRemoved/5;
    testParams.spd.push(scoreMult);
    console.log(testParams)

    //with all the params set, we now need to initate the games
    //we tell client to start the games on their end,

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
