console.log("javascript loaded");

let clientTodos = [];

// fetch current to-dos from the server
const syncTodos = async () => {
  const response = await fetch("/todos");
  const todosFromServer = await response.json();
  clientTodos = todosFromServer;
};

// update current todos
const updateTodos = async () => {
  await syncTodos();
  console.log(clientTodos);
  const todosList = document.getElementById("todos-list");
  todosList.innerHTML = "";
  clientTodos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.innerHTML = todo.title;
    todosList.appendChild(todoItem);
  });
};

updateTodos();
