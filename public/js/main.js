// FRONT-END (CLIENT) JAVASCRIPT HERE

document.addEventListener("DOMContentLoaded", function () {
  const todoForm = document.getElementById("todoForm");
  const todoInput = document.getElementById("todoInput");
  const todoList = document.getElementById("todoList");

  // Adding a new to-do task
  function addTodoItem(todoText) {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todoItem");
    todoItem.innerHTML = `
            <span>${todoText}</span>
            <button class="completeBtn">Complete</button>
            <button class="deleteBtn">Delete</button>
            <button class="editBtn">Edit</button>
        `;
    todoList.appendChild(todoItem);
  }

  // Event listener for form submission
  todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText !== "") {
      addTodoItem(todoText);
      todoInput.value = "";
    }
  });

  // Event delegation for complete, delete, and edit buttons
  todoList.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("completeBtn")) {
      markAsCompleted(target.parentNode);
    } else if (target.classList.contains("deleteBtn")) {
      deleteTodoItem(target.parentNode);
    } else if (target.classList.contains("editBtn")) {
      editTodoItem(target.parentNode);
    }
  });

  // Marking as Complete function
  function markAsCompleted(todoItem) {
    todoItem.classList.toggle("completed");
  }

  // Deleting function
  function deleteTodoItem(todoItem) {
    todoList.removeChild(todoItem);
  }

  // Editing function
  function editTodoItem(todoItem) {
    const span = todoItem.querySelector("span");
    const newText = prompt("Edit task:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText;
    }
  }
});
