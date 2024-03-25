// FRONT-END (CLIENT) JAVASCRIPT HERE
let selectedItem = 0;
function screenToView() {
    const makeWorkOutWindow = document.getElementById("make-workout-window");
    const viewWorkoutWindow = document.getElementById("view-workout-window");
    const editWorkoutWindow = document.getElementById("edit-workout-window");

    if (editWorkoutWindow.style.display === "none" || makeWorkOutWindow.style.display === "none") {
        makeWorkOutWindow.style.display = "none";
        editWorkoutWindow.style.display = "none"
        viewWorkoutWindow.style.display = "flex";
    }
}

function screenToMake() {
    const makeWorkOutWindow = document.getElementById("make-workout-window");
    const viewWorkoutWindow = document.getElementById("view-workout-window");
    const editWorkoutWindow = document.getElementById("edit-workout-window");

    if (viewWorkoutWindow.style.display === "none" || editWorkoutWindow.style.display === "none") {
        viewWorkoutWindow.style.display = "none";
        editWorkoutWindow.style.display = "none"
        makeWorkOutWindow.style.display = "flex";
    }
}

function deleteWorkout() {
    fetch("/" + selectedItem,
        {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error(error)
        })
    populateSidebar();
    populateTable();
    screenToMake();
}

function editWorkout() {
    const title = document.getElementById("title-edit");
    const desc = document.getElementById("description-edit");
    fetch("/" + selectedItem,
        {
            method: 'POST',
            body: JSON.stringify({
                type: "edit",
                title: title.value,
                description: desc.value
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error(error)
        })
    populateSidebar();
    populateTable();
    screenToMake();
}

function screenToEdit(elementId) {
    selectedItem = elementId;
    const makeWorkOutWindow = document.getElementById("make-workout-window");
    const viewWorkoutWindow = document.getElementById("view-workout-window");
    const editWorkoutWindow = document.getElementById("edit-workout-window");

    if (makeWorkOutWindow.style.display === "none" || viewWorkoutWindow.style.display === "none") {
        makeWorkOutWindow.style.display = "none";
        viewWorkoutWindow.style.display = "none";
        editWorkoutWindow.style.display = "flex"
    }

    fetch("/get_workouts")
        .then(res => res.json())
        .then(data => {
            const workout = data[elementId];
            const titleEntry = document.getElementById("title-edit");
            const descEntry = document.getElementById("description-edit");
            titleEntry.value = workout.title;
            descEntry.value = workout.description;
        })
        .catch(error => {
            console.error(error);
        })
}

function populateTable() {
  fetch("/get_workouts")
      .then(res => res.json())
      .then(data => {
        const tableBody = document.getElementById("table-body");
        tableBody.innerHTML = ""
        data.forEach(workout => {
          const row = tableBody.insertRow();

          const title = row.insertCell(0);
          const desc = row.insertCell(1);
          const time = row.insertCell(2);

          title.textContent = workout.title;
          desc.textContent = workout.description;
          time.textContent = workout.time;
        })

      })
      .catch(error => {
        console.error("ERROR: " + error);
      })
}

function populateSidebar() {
  fetch("/get_workouts")
      .then(res => res.json())
      .then(data => {
        const sidebar = document.getElementById("workout-list");
        let id = 0;
        sidebar.innerHTML = "";
        data.forEach(workout => {
          const sidebarElement = document.createElement('div');
          sidebarElement.classList.add('sidebar-entry');
          sidebarElement.innerText = workout.title;
          sidebarElement.id = id;
          sidebarElement.addEventListener("click", () => {
              screenToEdit(sidebarElement.id);
          })
          id +=1;
          sidebar.appendChild(sidebarElement);
        })

      })
      .catch(error => {
        console.error("ERROR: " + error);
      })
}

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  const titleInput = document.getElementById( "title" ),
      descInput = document.getElementById("description")
      json = {
        title: titleInput.value,
        description: descInput.value
      },
      body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method:"POST",
    body
  })

    titleInput.value = ""
    descInput.value = ""
  const text = await response.text()
  populateTable();
  populateSidebar();
}

window.onload = function() {
  populateTable();
  populateSidebar();
  const button = document.getElementById("submit-button");
  const newListButton = document.getElementById("make-workout");
  const viewWorkoutButton = document.getElementById("view-workout");
  const editButton = document.getElementById("edit-button");
  const deleteButton = document.getElementById("delete-button");
  newListButton.addEventListener("click", () => {
    screenToMake()
  });
  viewWorkoutButton.addEventListener("click", () => {
    screenToView()
  });
    editButton.addEventListener("click", () => {
        editWorkout()
    });
    deleteButton.addEventListener("click", () => {
        deleteWorkout()
    });


  button.onclick = submit;
}


