const http = require("http");
const fs = require("fs");
const mime = require("mime");
const dir = "public/";
const port = 3000;

let postcards = [];
let nextPostcardId = 1;

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
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function (request, response) {
  if (request.url === "/save-postcard") {
    let dataString = "";

    request.on("data", function (data) {
      dataString += data;
    });

    request.on("end", function () {
      try {
        const postData = JSON.parse(dataString);
        postData.id = nextPostcardId++;
        console.log("Received data:", postData);
        postcards.push(postData);

        response.writeHead(200, "OK", { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Postcard saved successfully!" }));
      } catch (error) {
        console.error("Error parsing JSON:", error);
        response.writeHead(400, { "Content-Type": "text/plain" });
        response.end("Error: Invalid JSON data");
      }
    });
  }
};

const handleDelete = function (request, response) {
  const urlParts = request.url.split("/");
  const postId = parseInt(urlParts[urlParts.length - 1]);

  const index = postcards.findIndex((postcard) => postcard.id === postId);
  if (index !== -1) {
    postcards.splice(index, 1);
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Postcard deleted successfully" }));
  } else {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Error: Postcard not found");
  }
};



const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
    if (err === null) {
      response.writeHeader(200, { "Content-Type": type });
      response.end(content);
    } else {
      response.writeHeader(404);
      response.end("404 Error: File Not Found");
    }
  });
};

server.listen(process.env.PORT || port);
