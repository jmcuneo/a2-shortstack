const rpe_chart = {
  1: {
      10: 100,
      9.5: 97.8,
      9: 95.5,
      8.5: 93.9,
      8: 92.2,
      7.5: 90.7,
      7: 89.2,
      6.5: 87.8,
      6: 86.3
  },
  2: {
      10: 95.5,
      9.5: 93.9,
      9: 92.2,
      8.5: 90.7,
      8: 89.2,
      7.5: 87.8,
      7: 86.3,
      6.5: 85,
      6: 83.7
  },
  3: {
      10: 92.2,
      9.5: 90.7,
      9: 89.2,
      8.5: 87.8,
      8: 86.3,
      7.5: 85,
      7: 83.7,
      6.5: 82.4,
      6: 81.1
  },
  4: {
      10: 89.2,
      9.5: 87.8,
      9: 86.3,
      8.5: 85,
      8: 83.7,
      7.5: 82.4,
      7: 81.1,
      6.5: 79.9,
      6: 78.6
  },
  5: {
      10: 86.3,
      9.5: 85,
      9: 83.7,
      8.5: 82.4,
      8: 81.1,
      7.5: 79.9,
      7: 78.6,
      6.5: 77.4,
      6: 76.2
  },
  6: {
      10: 83.7,
      9.5: 82.4,
      9: 81.1,
      8.5: 79.9,
      8: 78.6,
      7.5: 77.4,
      7: 76.2,
      6.5: 75.1,
      6: 73.9
  },
  7: {
      10: 81.1,
      9.5: 79.9,
      9: 78.6,
      8.5: 77.4,
      8: 76.2,
      7.5: 75.1,
      7: 73.9,
      6.5: 72.3,
      6: 70.7
  },
  8: {
      10: 78.6,
      9.5: 77.4,
      9: 76.2,
      8.5: 75.1,
      8: 73.9,
      7.5: 72.3,
      7: 70.7,
      6.5: 69.4,
      6: 68
  },
  9: {
      10: 76.2,
      9.5: 75.1,
      9: 73.9,
      8.5: 72.3,
      8: 70.7,
      7.5: 69.4,
      7: 68,
      6.5: 66.7,
      6: 65.3
  },
  10: {
      10: 73.9,
      9.5: 72.3,
      9: 70.7,
      8.5: 69.4,
      8: 68,
      7.5: 66.7,
      7: 65.3,
      6.5: 64,
      6: 62.6
  },
  11: {
      10: 70.7,
      9.5: 69.4,
      9: 68,
      8.5: 66.7,
      8: 65.3,
      7.5: 64,
      7: 62.6,
      6.5: 61.3,
      6: 59.9
  },
  12: {
      10: 68,
      9.5: 66.7,
      9: 65.3,
      8.5: 64,
      8: 62.6,
      7.5: 61.3,
      7: 59.9,
      6.5: 58.6,
      6: 57.4
  }
}

const http = require("http"),
  fs = require("fs"),
  mime = require("mime"),
  dir = "public/",
  port = 3000;

let appdata = [];
  
const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);
  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else if (request.url === "/calculate") {
    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(JSON.stringify(appdata));
  } else {
    sendFile(response, filename);
  }
};

function calculateResults(weight, rpe, reps){
  const estimatedMax = weight / rpe_chart[reps][rpe];
  const results = {};

    for (let reps = 1; reps <= 12; reps++) {
      results[reps] = {};

      for (let rpe = 6; rpe <= 10; rpe += 0.5) {
        const estimatedWeight = estimatedMax * rpe_chart[reps][rpe];

        results[reps][rpe] = estimatedWeight;
      }
    }
    return results;
}

const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    const inputData = JSON.parse(dataString);
    const weight = parseFloat(inputData.weight);
    const rpe = parseFloat(inputData.rpe);
    const reps = parseFloat(inputData.reps);
    appdata = [];
    appdata.push(rpe_chart);
    appdata.push(calculateResults(weight,rpe, reps));

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(appdata));
  });
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