const http = require("http"),
    fs = require("fs"),
    mime = require("mime"),
    dir = "public/",
    port = 3000;

const appdata = [];

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  } else if (request.method === "DELETE") {
    handleDelete(request, response);
  }
});

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else if (request.url === "/appdata") {
    response.writeHeader(200, { "Content-Type": "Text" });
    response.end(JSON.stringify(appdata));
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    let data = JSON.parse(dataString);

    //calculate derived fields
    let dob = new Date(data.dob);
    data.age = Math.abs(new Date(Date.now() - dob.getTime()).getUTCFullYear() - 1970); //javapoint
    data.fullName = data.firstName + " " + data.lastName;
    data.id = appdata.length; //for delete and update

    appdata.push(data);

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end("application added");
  });
};

const handleDelete = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
    dataString += data
  })

  request.on( "end", function() {

    let data = JSON.parse( dataString );
    const id = data.id;

    if(!(id===null)) {
      appdata.splice(id, 1);

      //reassign data ids
      for(let i = 0; i< appdata.length; i++){
        appdata[i].id = i;
      }

      response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
      response.end("application deleted")
    }
  })
}

const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
    // if the error = null, then we"ve loaded the file successfully
    if (err === null) {
      // status code: https://httpstatuses.com
      response.writeHeader(200, { "Content-Type": type });
      response.end(content);
    } else {
      // file not found, error code 404
      response.writeHeader(404);
      response.end("404 Error: File Not Found");
    }
  });
};

server.listen(process.env.PORT || port);
