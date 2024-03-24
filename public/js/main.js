// FRONT-END (CLIENT) JAVASCRIPT HERE

/**
 * creates an object and sends object to server side
 * serverside sends back an array or JSON objects
 * uses array from server to create HTML table
 */
const submit = async function (event) {
  // stop form submission from trying to load a new .html page for displaying results...
  // this was the original browser behavior and still remains to this day
  event.preventDefault();

  const nameInput = document.querySelector("#yourname");
  const itemInput = document.querySelector("#youritem");
  const priceInput = document.querySelector("#itemPrice");
  const qtyInput = document.querySelector("#numItems");

  document.getElementById("yourname").focus(); //put cursor in first box

  //make sure all fields complete
  if (
    isEmpty(nameInput.value) ||
    isEmpty(itemInput.value) ||
    isEmpty(qtyInput.value)
  ) {
    alert(
      "Please fill out all fields. If the price is unknown, you may leave it blank."
    );
    return;
  }

  const newEntry = createEntry(
    nameInput.value,
    itemInput.value,
    priceInput.value,
    qtyInput.value
  );

  const response = await fetch("/submit", {
    method: "POST",
    body: JSON.stringify(newEntry),
  });
  const text = await response.json();
  const justAdded = text[text.length - 1];
  makeGuestList(text, justAdded);
  addToTable(justAdded);
  console.log("text:", text);
};

/**
 * Check the array and compare to the name just entered - if name already in the array, do not add to list
 * If the name is not in the array, add to list
 */
const makeGuestList = function (array, item) {
  let nameCount = 0;
  for (let i = 0; i < array.length; i++) {
    if (item.name == array[i].name) {
      nameCount++;
    }
  }
  if (nameCount <= 1) {
    const list = document.getElementById("guestList");
    const li = document.createElement("li");
    li.setAttribute("id", "guestName");
    li.innerHTML = item.name;
    list.appendChild(li);
  } else {
    console.log("Cannot Add to List");
  }
};

//entry object
const createEntry = function (name, item, price, qty) {
  const entry = {};
  entry.name = name;
  entry.item = item;
  entry.price = price;
  entry.qty = qty;
  return entry;
};

/**
 * Adds row to HTML table
 * creates an event listener for each button created - can get index from click
 */
const addToTable = function (entry) {
  const table = document.getElementById("table");
  const row = `<tr id="entryRow">
                <td>${entry.name}</td>
                <td>${entry.item}</td>
                <td>${entry.qty}</td>
                <td>${entry.cost}</td>
                <td><button class="remove">Remove</button></td>
              </tr>`;
  table.insertAdjacentHTML("beforeend", row);
  //eventlistener
  const removeButton = table.querySelector(".remove:last-child");
  removeButton.addEventListener("click", function (event) {
    event.preventDefault();
  });
  resetTextBoxes();
};

// Set input boxes to empty - user does not have to delete previous entry
const resetTextBoxes = function () {
  document.querySelector("#yourname").value = "";
  document.querySelector("#youritem").value = "";
  document.querySelector("#itemPrice").value = ""; //new
  document.querySelector("#numItems").value = "";
};

//check if input box is empty
function isEmpty(str) {
  return !str || str.length === 0;
}

/**
 * send empty data to server
 * server sends back current appdata array
 * rebuild the table using add to table and looping through each element in array
 */
const refreshPage = async function () {
  const response = await fetch("/refresh", {
    method: "POST",
    body: "",
  });
  const text = await response.json();
  for (let i = 0; i < text.length; i++) {
    addToTable(text[i]);
    makeGuestList(text, text[i]);
  }
  document.getElementById("yourname").focus(); //put cursor in first input box
  console.log("done");
};

/**
 * send the index of the entry user wants to delete from array
 * server sends updated array back
 * clear table called to remove the row
 */
const remove = async function (entryIndex) {
  const response = await fetch("/remove", {
    method: "POST",
    body: JSON.stringify(entryIndex),
  });
  const text = await response.json();
  clearTable(text);
};

//clear the table and guest list and rebuild from new array
const clearTable = function (text) {
  for (let i = 0; i <= text.length; i++) {
    document.getElementById("entryRow").remove();
    if (document.getElementById("guestName") != undefined) {
      document.getElementById("guestName").remove();
    }
  }
  refreshPage();
};

window.onload = function () {
  refreshPage();
  const button = document.getElementById("submit");
  button.onclick = submit;
  //event listener
  document.addEventListener("click", function (event) {
    event.preventDefault();
    //check if there are any elements to remove
    if (event.target && event.target.classList.contains("remove")) {
      //use event listener to get the index and use to call remove
      const entryIndex = event.target.closest("tr").rowIndex - 1; // Subtract 1 because of table header
      remove.onclick = remove(entryIndex);
    }
  });
};