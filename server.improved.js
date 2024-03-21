const http = require("http"),
	fs = require("fs"),
	// IMPORTANT: you must run `npm install` in the directory for this assignment
	// to install the mime library if you"re testing this on your local machine.
	// However, Glitch will install it automatically by looking in your package.json
	// file.
	mime = require("mime"),
	dir = "public/",
	port = 3000



const appData = [
	// * below is an example of how course objects will look
	// { "cID": 3013, "cName": "Operating Systems", "prof": "Andrews", "term" : "A"},
]

const server = http.createServer(function (request, response) {
	if (request.method === "GET") {
		handleGet(request, response);
	} else if (request.method === "POST") {
		handlePost(request, response);
	} else if (request.method === "DELETE") {
		handleDelete(request, response);
	}
})

const handleGet = function (request, response) {
	const filename = dir + request.url.slice(1)

	if (request.url === "/") {
		sendFile(response, "public/index.html")
	} else {
		sendFile(response, filename)
	}
}

const handlePost = function (request, response) {
	let dataString = ""

	request.on("data", function (data) {
		dataString += data
	})

	request.on("end", function () {
		course = JSON.parse(dataString);

		if (appData.some(data => data.cID === course.cID)) {
			// course already exists, let's update the record :)
			const courseIndex = appData.findIndex(data => data.cID === course.cID);
			appData[courseIndex] = course;
		} else {
			appData.push(course);
		}

		console.log(appData);

		response.writeHead(200, "OK", { "Content-Type": "application/json" })
		response.end(JSON.stringify(appData));
	})
}

const handleDelete = function (request, response) {
	let dataString = ""

	request.on("data", function (data) {
		dataString += data
	})

	request.on("end", function () {
		cid = JSON.parse(dataString);
		console.log( JSON.parse( dataString ) );

		if (appData.some(data => data.cID === cid.cID)) {
			console.log("course exists. deleting");
			const index = appData.findIndex(data => data.cID === cid.cID);
			appData.splice(index, 1)
		} else {
			console.log("course does not exist");
		}

		response.writeHead(200, "OK", { "Content-Type": "application/json" });
		response.end(JSON.stringify(appData));
	})
}

const sendFile = function (response, filename) {
	const type = mime.getType(filename)

	fs.readFile(filename, function (err, content) {

		// if the error = null, then we"ve loaded the file successfully
		if (err === null) {

			// status code: https://httpstatuses.com
			response.writeHeader(200, { "Content-Type": type })
			response.end(content)

		} else {

			// file not found, error code 404
			response.writeHeader(404)
			response.end("404 Error: File Not Found")

		}
	})
}

server.listen(process.env.PORT || port)
