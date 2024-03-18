const express = require("express");
const app = express();
const path = require("path");

// serve files in public folder
app.use(express.static(path.join(__dirname, "public")));

// fake database
let todos = [
  { id: 1, title: "Learn React", completed: true },
  { id: 2, title: "Learn Node", completed: false },
  { id: 3, title: "Learn Express", completed: false },
  { id: 4, title: "Learn MongoDB", completed: false },
];

// routes

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
