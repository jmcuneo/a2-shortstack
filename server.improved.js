const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

const appdata = { "x": 0, "y": 0, "hscores": [], "second_x": 0, "second_y": 0, "true_x": 0, "true_y": 0, "score": 0, "activeTargets": [{x: 13, y: 40}], "activeLines": []};
const radius = 15;

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
  }else if(request.url === "/targets") {
    response.writeHead( 200, "OK", {"Content-Type": "application/json" })
    response.write(JSON.stringify(appdata.activeTargets))
    response.end()
  } else if(request.url === "/score") {
    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.write("" + appdata.score)
    response.end()
  } else if(request.url === "/hscores") {
    response.writeHead( 200, "OK", {"Content-Type": "application/json" })
    response.write(JSON.stringify(appdata.hscores))
    response.end()
  } else if(request.url === "/lines") {
    response.writeHead( 200, "OK", {"Content-Type": "application/json" })
    response.write(JSON.stringify(appdata.activeLines))
    response.end()
  } else {
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {

    if (request.url === "/submit") {
      const data = JSON.parse( dataString )
      
      // ... do something with the data here!!!
      appdata.x = data.mouse_x;
      appdata.y = data.mouse_y;
      appdata.true_x = data.true_x;
      appdata.true_y = data.true_y;
      appdata.second_x = data.second_x;
      appdata.second_y = data.second_y;



      //Check for target hits
      let x = 0;
      while(x < appdata.activeTargets.length) {
        let target = appdata.activeTargets[x];
        let d = Math.sqrt((appdata.x - target.x)**2 + (appdata.y - target.y)**2)
        if (d < radius) {
          appdata.activeTargets.pop(x);
          appdata.activeTargets.push({x: 10 + Math.floor(Math.random()*300), y: 10 + Math.floor(Math.random()*300)})
          appdata.score++;
          x--;
        }
        x++;
      }

      response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
      response.write(JSON.stringify({x: appdata.x, y: appdata.y}), 'utf8')
      response.end()
    } else {
      appdata.hscores.push(appdata.score)
      appdata.score = 0;

      response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
      response.end()
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

const lineInterval = 300; //line spawn rate in ms
const lineSpawnDist = 600; //line spawn distance
const buffer = 900;
// const maxLines = 3;
const spawnLine = async function() {
  //Exit if score is less than 15
  if(appdata.score < 3 || appdata.activeLines.length >= Math.floor(appdata.score/10))
    return;
  
  const angle = Math.random()*360 - 180;
  appdata.activeLines.push({
    x: buffer + (Math.cos((angle*Math.PI)/180) < 0 ? lineSpawnDist*Math.random() : -lineSpawnDist*Math.random()),
    y: buffer*0.66 + (Math.sin((angle*Math.PI)/180) < 0 ? lineSpawnDist*Math.random() : -lineSpawnDist*Math.random()),
    angle: angle
  });

}

let lineSpeedMod = 8;
const updateLine = async function() {
  for(let i = 0; i < appdata.activeLines.length; i++) {
    let line = appdata.activeLines[i];
    const spd = lineSpeedMod*(Math.floor(appdata.score/10)/100 + 0.9);
    line.x += Math.cos((line.angle*Math.PI)/180)*spd;
    line.y += Math.sin((line.angle*Math.PI)/180)*spd;

    let remove = line.x < -100 || line.x > buffer*2 || line.y < -100 || line.y > buffer*1.33;
    if((appdata.true_x > line.x && appdata.true_x < line.x + 40 && appdata.true_y > line.y && appdata.true_y < line.y + 40) ||
       (appdata.second_x > line.x && appdata.second_x < line.x + 40 && appdata.second_y > line.y && appdata.second_y < line.y + 40)) {
      appdata.score -= 10;
      remove = true;
    }

    if (remove) {
      appdata.activeLines.splice(i, 1);
      i--;
    }
  }
}

setInterval(spawnLine, lineInterval);
setInterval(updateLine, 50)
server.listen( process.env.PORT || port )
