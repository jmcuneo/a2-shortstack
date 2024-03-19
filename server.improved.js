const http = require("http");
const fs = require("fs");
const mime = require("mime");
const dir = "public/";
const port = 3000;

// Sample dataset with three fields: model, year, and mpg
const appdata = [
  { model: "Toyota", year: 1999, mpg: 23, gallons: 15 },
  { model: "Honda", year: 2004, mpg: 30, gallons: 12 },
  { model: "Ford", year: 1987, mpg: 14, gallons: 19}
];

const server = http.createServer(function(request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

const handleGet = function(request, response) {
  const filename = dir + (request.url.slice(1) || "index.html");

  if (request.url === "/data") {  // Change this line from "/results" to "/data"
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(appdata));
  } else {
    fs.readFile(filename, function(err, content) {
      if (err) {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end("404 Error: File Not Found");
      } else {
        response.writeHead(200, { "Content-Type": mime.getType(filename) });
        response.end(content);
      }
    });
  }
};



const handlePost = function(request, response) {
  let dataString = "";

  request.on("data", function(data) {
    dataString += data;
  });

  request.on("end", function() {
    const incomingData = JSON.parse(dataString);

    if (request.url === '/add') {
      // Add a derived field 'range' to the incoming data
      incomingData.range = incomingData.mpg * incomingData.gallons;

      // Integrate the incoming data with the existing dataset
      appdata.push(incomingData);
    } else if (request.url === '/delete') {
      // Delete the item at the specified index
      const index = incomingData.index;
      if (index >= 0 && index < appdata.length) {
        appdata.splice(index, 1);
      }
    } else if (request.url === '/update') {
      // Update the item at the specified index
      const index = incomingData.index;
      if (index >= 0 && index < appdata.length) {
        appdata[index] = { ...appdata[index], ...incomingData.updatedData };
        // Recalculate the range for the updated car
        appdata[index].range = appdata[index].mpg * appdata[index].gallons;
      }
    }

    // Send a response with the updated dataset
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(appdata));
  });
};





server.listen(port, function() {
  console.log(`Server is listening on port ${port}`);
});
