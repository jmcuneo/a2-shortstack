const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

/*Array that maintains the workout data in the backend*/
let workoutDataArray = [];

/*HTTP server constant that makes use of the POST, GET, DELETE, and PUT handler functions below*/
const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )
  }else if( request.method === "POST" ){
    handlePost( request, response )
  } else if( request.method === "DELETE" ){
    handleDelete( request, response )
  } else if ( request.method === "PUT" ) {
    handlePut( request, response );
  }
});

/*Server-side function that handles getting workouts from the backend*/
const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 )

  if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  }else if (request.url === "/workout_data") {
    response.writeHead(200, {"Content-Type": "application/json"});
    response.end(JSON.stringify(workoutDataArray));
  }else{
    sendFile( response, filename )
  }
}

/*Server-side function that handles editing workouts that are stored in the backend*/
const handlePut = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
    dataString += data
    console.log("Workout Edit: " + data);
  })


  request.on( "end", function() {
    const requestDataString = JSON.parse(dataString);

    const index = requestDataString.json.index;

    workoutDataArray[index].starting_time = requestDataString.json.starting_time;
    workoutDataArray[index].ending_time = requestDataString.json.ending_time;
    workoutDataArray[index].workout_type = requestDataString.json.workout_type;
    workoutDataArray[index].workout_intensity = requestDataString.json.workout_intensity;
    const startingTime = new Date("2024-01-01 " + workoutDataArray[index].starting_time);
    let endingTime = new Date("2024-01-01 " + workoutDataArray[index].ending_time);
    if(endingTime < startingTime) {
      endingTime = new Date("2024-01-02 " + workoutDataArray[index].ending_time);
    }
    const totalMinutes = (endingTime - startingTime) / (60000); // Convert milliseconds to minutes
    workoutDataArray[index].estimated_calories = calcEstCaloriesBurned(workoutDataArray[index].workout_type, workoutDataArray[index].workout_intensity, totalMinutes);

    response.writeHead( 200, "OK", {"Content-Type": "application/json" })
    response.end(JSON.stringify(workoutDataArray[index]));
  })
}

/*Server-side function that handles posting workouts to the backend*/
const handlePost = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data
  })


  request.on( "end", function() {
    const requestDataString = JSON.parse(dataString);

    const startingTime = new Date("2024-01-01 " + requestDataString.starting_time);
    let endingTime = new Date("2024-01-01 " + requestDataString.ending_time);
    if(endingTime < startingTime) {
      endingTime = new Date("2024-01-02 " + requestDataString.ending_time);
    }
    let totalMinutes = (endingTime - startingTime) / (60000); // Convert milliseconds to minutes


    const totalWorkoutDuration = `${Math.floor(totalMinutes / 60)} hour ${totalMinutes % 60} minutes`;

    const estimated_calories = calcEstCaloriesBurned(requestDataString.workout_type, requestDataString.workout_intensity, totalMinutes);

    requestDataString.totalWorkoutDuration = totalWorkoutDuration;
    requestDataString.estimated_calories = estimated_calories;

    console.log( JSON.parse( dataString ) )

    workoutDataArray.push(requestDataString);
    console.log(workoutDataArray); // Log workoutDataArray here


    response.writeHead( 200, "OK", {"Content-Type": "application/json" })
    response.end(JSON.stringify(requestDataString));
  })
}

/*Server-side function that handles deleting workouts from the backend*/
const handleDelete = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
    dataString += data
  })

  request.on( "end", function() {
    const { index } = JSON.parse(dataString);

    workoutDataArray.splice(index, 1); // Remove the item at the specified index

    response.writeHead( 200, "OK", {"Content-Type": "application/json" })
    response.end();
  })
}

/*This function computes the logic for the derived field in the table. Based on the workout type, intensity, and duration in minutes, it is able to give you an estimate for calories burned.*/
function calcEstCaloriesBurned(workoutType, workoutIntensity, workoutDurationMins) {
  let caloriesBurnedPerMin;

  /*Stats gain from the Jamaica Hospital Medical Center's - Health Beat website & Captain Calculator*/
  switch (workoutType) {
    case "Soccer":
      caloriesBurnedPerMin = 8; // Calories burned per minute for soccer
      break;
    case "Football":
      caloriesBurnedPerMin = 9; // Calories burned per minute for football
      break;
    case "Boxing":
      caloriesBurnedPerMin = 8; // Calories burned per minute for boxing
      break;
    case "Wrestling":
      caloriesBurnedPerMin = 9; // Calories burned per minute for wrestling
      break;
    default:
      caloriesBurnedPerMin = 0;
      break;
  }

  /*The intensities might not be completely accurate, but they are close*/
  switch (workoutIntensity) {
    case "Low":
      caloriesBurnedPerMin *= 0.47;
      break;
    case "Medium":
      caloriesBurnedPerMin *= 0.75;
      break;
    case "High":
      caloriesBurnedPerMin *= 1.10;
      break;
    default:
      break;
  }

  return (caloriesBurnedPerMin * workoutDurationMins).toFixed(2);
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
