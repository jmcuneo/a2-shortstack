const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

const taskData = [
  { "id": 1, "mode" : 0, "task": "A1 HW", "class": "CS4241", "duedate": "03/20/2024", "importance": "Yes", "priority": 0},
  { "id": 2, "mode" : 0, "task": "HW 1", "class": "CS4342", "duedate": "03/22/2024", "importance": "No", "priority": 0},
  { "id": 3, "mode" : 0, "task": "Lecture notes", "class": "ECE3849", "duedate": "03/24/2024", "importance": "Yes", "priority": 0},
  { "id": 4, "mode" : 0, "task": "Lab 1", "class": "ECE3849", "duedate": "04/03/2024", "importance": "Yes", "priority": 0}
]

taskData.forEach(element => {
  determinePriority(element);
});


const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  } else if( request.method === "DELETE") {
    handleDelete(request, response)
  } else if (request.method === "PATCH") {
    handlePatch(request, response)
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  } else if(request.url === "/taskData/") {
    sendFile ( response, taskData);
  } else {
    sendFile( response, filename );
  }
}

const handlePost = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {

    let taskObject = JSON.parse( dataString );

    // Initial preload mode
    if(taskObject.mode === 3) {
      null;
    } 
    // Add mode
    else if(taskObject.mode === 0) {
      // Update id
      taskObject.id = taskData[taskData.length-1].id + 1;

      // Update priority
      determinePriority(taskObject);

      // Push new object to taskData array
      taskData.push(taskObject);
    }
    response.writeHead( 200, "OK", {"Content-Type": "text/plain" });
    response.end(JSON.stringify(taskData));
  })
}



const handleDelete = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {

    let taskObject = JSON.parse( dataString );

    // TODO MAKE FUNCTION Find index of task based on ID
    let foundTask = false;
    let i = 0;
    while(foundTask === false && i < taskData.length) {
      if(taskData[i].id === taskObject.id) {
        foundTask = true;
        i--;
      }
      i++;
    }

    // Delete mode
    taskData.splice(i, 1);

    ///printData()
    response.writeHead( 200, "OK", {"Content-Type": "text/plain" });
    response.end(JSON.stringify(taskData));
  })
}



const handlePatch = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {

    let taskObject = JSON.parse( dataString );

    // Find index of task based on ID
    let foundTask = false;
    let i = 0;
    while(foundTask === false && i < taskData.length) {
      if(taskData[i].id === taskObject.id) {
        foundTask = true;
        i--;
      }
      i++;
    }

    // Edit mode
    // Update priority
    determinePriority(taskObject);
    // Update object
    taskData[i] = taskObject;

    ///printData()
    response.writeHead( 200, "OK", {"Content-Type": "text/plain" });
    response.end(JSON.stringify(taskData));
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





// Determines the priority based on duedate, importance, and the current date
function determinePriority(data) {
  let currentDate = new Date();

  //turn duedate into a date object
  let parts = data.duedate.split("/");
  let dueDate = new Date(parts[2], parts[0] - 1, parts[1]);

  // Convert both dates to UTC
  let utcDate1 = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  let utcDate2 = Date.UTC(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());

  // Calculate different in ms and then convert to days
  let diffDays = Math.floor(Math.abs(utcDate2 - utcDate1) / (1000 * 60 * 60 * 24));

  // Determine priority
  if((diffDays <= 2 && data.importance === "Yes") || (diffDays <= 1 && data.importance === "No")) {
    data.priority = 1;
  } else if((diffDays <= 3 && data.importance === "Yes") || (diffDays <= 2 && data.importance === "No")) {
    data.priority = 2;
  } else if((diffDays <= 4 && data.importance === "Yes") || (diffDays <= 3 && data.importance === "No")) {
    data.priority = 3;
  } else {
    data.priority = 4;
  }
}



const printData = function() {
  for (let i = 0; i < taskData.length; i++) {
    console.log(taskData[i].id + " " + taskData[i].task + " " + taskData[i].class + " " + taskData[i].duedate + " " + taskData[i].importance + " " + taskData[i].priority);
  }
}

server.listen( process.env.PORT || port )
