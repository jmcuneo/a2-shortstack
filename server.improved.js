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
  { "id": 1, "task": "A1 HW", "class": "CS4241", "duedate": "03/20/2024", "importance": "Yes", "priority": 0},
  { "id": 2, "task": "HW 1", "class": "CS4342", "duedate": "03/22/2024", "importance": "No", "priority": 0},
  { "id": 3, "task": "Lecture notes", "class": "ECE3849", "duedate": "03/24/2024", "importance": "Yes", "priority": 0},
  { "id": 4, "task": "Lab 1", "class": "ECE3849", "duedate": "04/03/2024", "importance": "Yes", "priority": 0}
]

taskData.forEach(element => {
  determinePriority(element);
});


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

    var taskObject = JSON.parse( dataString );
    
    // Update id
    taskObject.id = taskData[taskData.length-1].id + 1;

    // Update priority
    determinePriority(taskObject);

    // Push new object to taskData array
    taskData.push(taskObject);

    console.log(taskObject);
    printData()

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
  var currentDate = new Date();

  //turn duedate into a date object
  var parts = data.duedate.split("/");
  var dueDate = new Date(parts[2], parts[0] - 1, parts[1]);

  // Convert both dates to UTC
  var utcDate1 = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  var utcDate2 = Date.UTC(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());

  // Calculate different in ms and then convert to days
  var diffDays = Math.floor(Math.abs(utcDate2 - utcDate1) / (1000 * 60 * 60 * 24));

  // Determine priority
  if((diffDays <= 2 && data.importance == "Yes") || (diffDays <= 1 && data.importance == "No")) {
    data.priority = 1;
  } else if((diffDays <= 3 && data.importance == "Yes") || (diffDays <= 2 && data.importance == "No")) {
    data.priority = 2;
  } else if((diffDays <= 4 && data.importance == "Yes") || (diffDays <= 3 && data.importance == "No")) {
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
