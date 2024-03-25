const http = require("http");
const fs = require("fs");
const mime = require("mime");

const port = process.env.PORT || 3000;

let appdata = [
  { "task": "groceries", "priority": "low", "creationdate": "3/18/2024, 11:13:00 AM" },
  { "task": "sleep", "priority": "low", "creationdate": "3/18/2024, 11:14:00 AM" },
  { "task": "homework", "priority": "high", "creationdate": "3/18/2024, 11:15:00 AM"} 
];

const server = http.createServer((request, response) => {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

const handleGet = (request, response) => {
  const filename = "public" + request.url;

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else if (request.url === "/getdata") {
    const dataWithDeadline = appdata.map(item => {
      const deadline = calculateDeadline(item.creationdate, item.priority);
      return { ...item, deadline }; 
    });
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(dataWithDeadline)); 
  } else {
    sendFile(response, filename);
  }
};

const handlePost = (request, response) => {
  let dataString = "";

  request.on("data", (data) => {
    dataString += data;
  });

  request.on("end", () => {
    const requestData = JSON.parse(dataString);
    if (requestData.action === "delete") {
      const { index } = requestData;
      if (index >= 0 && index < appdata.length) {
        appdata.splice(index, 1);
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end("Task deleted");
      } else {
        response.writeHead(400, { "Content-Type": "text/plain" });
        response.end("Invalid task index");
      }
    } else {
      const newData = requestData;
      const deadline = calculateDeadline(newData.creationdate, newData.priority);
      newData.deadline = deadline;
      appdata.push(newData);
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end("Data received");
    }
  });
};


const sendFile = (response, filename) => {
  const type = mime.getType(filename);

  fs.readFile(filename, (err, content) => {
    if (err === null) {
      response.writeHeader(200, { "Content-Type": type });
      response.end(content);
    } else {
      response.writeHeader(404);
      response.end("404 Error: File Not Found");
    }
  });
};

const calculateDeadline = (creationdate, priority) => {
  const deadlineDate = new Date(creationdate);
  if (priority === "high") {
    deadlineDate.setDate(deadlineDate.getDate() + 3);
  } else {
    deadlineDate.setDate(deadlineDate.getDate() + 7);
  }
  return deadlineDate.toLocaleDateString(); 
};

server.listen(port);
