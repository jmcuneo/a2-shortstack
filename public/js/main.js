console.log("javascript loaded");

// fetch current to-dos from the server
const getTodos = async () => {
  const response = await fetch("/todos");
  const todos = await response.json();
  return todos;
};

console.log(getTodos());
