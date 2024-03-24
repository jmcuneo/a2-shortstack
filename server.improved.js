const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library if you"re testing this on your local machine.
  // However, Glitch will install it automatically by looking in your package.json
  // file.
  mime = require("mime"),
  dir = "public/",
  port = 3000

let appdata = [

]

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response)
  }
  else if (request.method === "POST") {
    handlePost(request, response)
  }
  else if (request.method === "DELETE") {
    handleDelete(request, response)
  }
  else if (request.method === "PUT") {
    handlePut(request, response)
  }
})

const handleGet = function (request, response) {

  const filename = dir + request.url.slice(1)

  if (request.url === "/") {
    sendFile(response, "public/index.html")
  }
  else if (request.url === "/appdata") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(appdata));
  }
  else if (request.url === "/submit") {
    sendFile(response, "public/index.html")
  }
  else {
    sendFile(response, filename)
  }
}

let totalCredits = 0
let totalGradePoints = 0
let id = 0
let gpa = 0
let prevGPA = 0
let changeInGPA = 0

const handlePost = function (request, response) {
  let dataString = ""

  request.on("data", function (data) {
    dataString += data
  })

  request.on("end", function () {
    //console.log( JSON.parse( dataString ) )

    let parsedJSON = JSON.parse(dataString)

    const grade = parsedJSON.grade
    const numCredits = parseFloat(parsedJSON.credits)
    const className = parsedJSON.class

    let individualGradePoints = 0

    switch (grade) {
      case 'A':
        individualGradePoints = 4
        break;
      case 'B':
        individualGradePoints = 3
        break;
      case 'C':
        individualGradePoints = 2
        break;
      case 'D':
        individualGradePoints = 1
        break;
      default:
        individualGradePoints = 0
        break;
    }

    totalGradePoints += (individualGradePoints * numCredits)
    totalCredits += numCredits

    gpa = (totalGradePoints / totalCredits).toFixed(2);
    changeInGPA = gpa - prevGPA
    prevGPA = gpa

    appdata.push({ "id": id, "class": className, "grade": grade, "credits": numCredits, "currentGPA": changeInGPA.toFixed(2) });
    console.log(appdata)
    id++

    response.writeHead(200, "OK", { "Content-Type": "text/plain" })
    response.end(gpa.toString())
  })
}

const handleDelete = function (request, response) {
  let dataString = ""

  request.on("data", function (data) {
    dataString += data
  })

  request.on("end", function () {

    let parsedJSON = JSON.parse(dataString)
    const toBeDeletedID = parseFloat(parsedJSON.id)
    let individualGradePoints = 0

    let arraySize = Object.keys(appdata).length
    for (let i = 0; i < arraySize; i++) {
      if (appdata[i].id === toBeDeletedID) {
        switch (appdata[i].grade) {
          case 'A':
            individualGradePoints = 4
            break;
          case 'B':
            individualGradePoints = 3
            break;
          case 'C':
            individualGradePoints = 2
            break;
          case 'D':
            individualGradePoints = 1
            break;
          default:
            individualGradePoints = 0
            break;
        }

        totalGradePoints -= (individualGradePoints * appdata[i].credits)

        totalCredits -= appdata[i].credits

        gpa = (totalGradePoints / totalCredits).toFixed(2)
      }
    }

    appdata = appdata.filter((obj) => obj.id !== toBeDeletedID)

    console.log(appdata);

    if (arraySize === 1) {
      response.writeHead(204, "NO CONTENT", { "Content-Type": "text/plain" })
      prevGPA = 0
    } else {
      response.writeHead(200, "OK", { "Content-Type": "text/plain" })
    }
    response.end(gpa.toString());
  })
}

const handlePut = function (request, response) {
  let dataString = ""

  request.on("data", function (data) {
    dataString += data
  })

  request.on("end", function () {
    //console.log( JSON.parse( dataString ) )

    let parsedJSON = JSON.parse(dataString)
    const idToBeModified = parseFloat(parsedJSON.id)
    const gradeModified = parsedJSON.grade
    const numCreditsModified = parseFloat(parsedJSON.credits)
    const classNameModified = parsedJSON.class

    let foundIndex = 0
    let arraySize = Object.keys(appdata).length
    for (let i = 0; i < arraySize; i++) {
      if (appdata[i].id === idToBeModified) {

        let individualGradePoints = 0
        switch (appdata[i].grade) {
          case 'A':
            individualGradePoints = 4
            break;
          case 'B':
            individualGradePoints = 3
            break;
          case 'C':
            individualGradePoints = 2
            break;
          case 'D':
            individualGradePoints = 1
            break;
          default:
            individualGradePoints = 0
            break;
        }

        totalGradePoints -= (individualGradePoints * appdata[i].credits)
        totalCredits -= appdata[i].credits

        appdata[i].grade = gradeModified
        appdata[i].class = classNameModified
        appdata[i].credits = numCreditsModified
        foundIndex = i
      }
    }

    switch (gradeModified) {
      case 'A':
        individualGradePoints = 4
        break;
      case 'B':
        individualGradePoints = 3
        break;
      case 'C':
        individualGradePoints = 2
        break;
      case 'D':
        individualGradePoints = 1
        break;
      default:
        individualGradePoints = 0
        break;
    }

    totalGradePoints += (individualGradePoints * numCreditsModified)
    totalCredits += numCreditsModified

    gpa = (totalGradePoints / totalCredits).toFixed(2)
    changeInGPA = gpa - prevGPA
    appdata[foundIndex].currentGPA = changeInGPA.toFixed(2)
    prevGPA = gpa

    console.log(appdata);
    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(gpa.toString());
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
