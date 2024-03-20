const http = require("http"),
      fs = require("fs"),
      mime = require("mime"),
      dir = "public/",
      port = 3000;

/*const appdata = [
    {"model": "toyota", "year": 1999, "mpg": 23},
    {"model": "honda", "year": 2004, "mpg": 30},
    {"model": "ford", "year": 1987, "mpg": 14}
];*/

const appdata = [];

const server = http.createServer(function(request, response) {
    if (request.method === "GET") {
        handleGet(request, response);
    } else if (request.method === "POST") {
        handlePost(request, response);
    }
});

const handleGet = function(request, response) {
    //console.log(request);
    const filename = dir + request.url.slice(1);
    if (request.url === "/") {
        sendFile(response, "public/index.html");
    } else if (request.url === "/appdata") {
        createTable(response);
    } else {
        sendFile(response, filename);
    }
};

const handlePost = function(request, response) {
    let dataString = "";
    request.on("data", function(data) {
        dataString += data;
    });
    request.on("end", function() {
        const data = JSON.parse(dataString);
        console.log(data);
        console.log(request.url);

        // ... do something with the data here!!!
        if (request.url === "/submit") {
            appdata.push({name: data.name,
                          prep: data.prep,
                          cook: data.cook});
        } else if (request.url === "/delete") {
            //appdata.splice(appdata.indexOf({}), 1);
            for (let i in appdata) {
                if (appdata[i].name === data.name) {
                    appdata.splice(i, 1);
                    break;
                }
            }
        }
        createTable(response);
    });
};

const createTable = function(response) {
    let table = "<tr><th>Recipe Name</th><th>Prep Time</th><th>Cook Time</th><th>Total Time</th></tr>";
    for (let data of appdata)
        table += `<tr><td>${data.name}</td><td>${data.prep}</td><td>${data.cook}</td><td>${parseInt(data.prep) + parseInt(data.cook)}</td></tr>`;
    response.writeHeader(200, {"Content-Type": "string"});
    response.end(table);
    //console.log(response);
}

const sendFile = function(response, filename) {
    const type = mime.getType(filename);
    fs.readFile(filename, function (err, content) {
        // if the error = null, then we"ve loaded the file successfully
        if (err === null) {
            // status code: https://httpstatuses.com
            response.writeHeader(200, {"Content-Type": type});
            response.end(content);
        } else {
            // file not found, error code 404
            response.writeHeader(404);
            response.end("404 Error: File Not Found");
        }
    });
};

server.listen(process.env.PORT || port);