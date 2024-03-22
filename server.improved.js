const http = require( "http" ),
    fs   = require( "fs" ),
    mime = require( "mime" ),
    dir  = "public/",
    port = 3000

let appdata = [];

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 )

  if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  } else {
    sendFile( response, filename )
  }
}

const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    const formData = JSON.parse(dataString);

    // ... do something with the data here!!!
    // calculate age - from javapoint.com
    var dob = formData.dob;
    //calculate month difference from current date in time
    var month_diff = Date.now() - dob.getTime();
    //convert the calculated difference in date format
    var age_dt = new Date(month_diff);
    //extract year from date
    var year = age_dt.getUTCFullYear();

    //now calculate the age of the user
    let age = Math.abs(year - 1970);
    const month = today.getMonth() - dob.getMonth();
    if(month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    //derived variables
    formData.age = age;
    formData.fullName = formData.firstName + " " + formData.lastName;

    appdata.push(formData);

    //
    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end("test")
  });
};

const sendFile = function( response, filename ) {
  const type = mime.getType( filename )

  fs.readFile( filename, function( err, content ) {

    // if the error = null, then we"ve loaded the file successfully
    if( err === null ) {

      /*ADD DATA HERE*/
      // get table and empty it
      var table = document.querySelector(" #data-table ");
      table.innerHTML = '';

      // parse data
      const data = JSON.parse(text);

      // add to table - stack overflow
      for(const elt of data) {

        var row = table.insertRow();
        var nameCell = row.insertCell();
        nameCell.id = "nameCell";
        var dobCell = row.insertCell();
        dobCell.id = "dobCell";
        var ageCell = row.insertCell();
        ageCell.id = "ageCell";
        var emailCell = row.insertCell();
        emailCell.id = "emailCell";

        // add new elements and set their values
        row.appendChild(del);

        nameCell.innerHTML = elt.id;
        dobCell.innerHTML = elt.name;
        ageCell.innerHTML = elt.age;
        emailCell.innerHTML = elt.birthday;
      }

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