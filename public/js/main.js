// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  //declare object -> used let because const must be initialized
  //assign input values to -Input variables
  const nameInput = document.querySelector("#yourname");
  const itemInput = document.querySelector("#youritem");
  const qtyInput = document.querySelector("#numItems");
/*
  if(isEmpty(nameInput.value) || isEmpty(itemInput.value) || isEmpty(qtyInput.value)){
    alert("Please fill out all fields.");
  }
*/
  const newEntry = createEntry(nameInput.value, itemInput.value, qtyInput.value);

  //Fetch - send to server
  const response = await fetch("/submit", {
    method: "POST",
    body: JSON.stringify(newEntry),
  })
  //promise
  const text = await response.json();
  const justAdded = text[text.length - 1];
  addToTable(justAdded);
  console.log("text:", text);
};


const createEntry = function (name, item, qty) {
  const entry = {};
  entry.name = name;
  entry.item = item;
  entry.qty = qty;
  return entry;
};

//adds row to html table
const addToTable = function(entry){
  const table = document.getElementById("table");
  const row = `<tr id="entryRow">
                <td>${entry.name}</td>
                <td>${entry.item}</td>
                <td>${entry.qty}</td>
                <td><button class="remove">Remove</button></td>
              </tr>`;
  table.insertAdjacentHTML('beforeend', row);
  //
  const removeButton = table.querySelector('.remove:last-child');
  removeButton.addEventListener('click', function(event) {
    event.preventDefault();
  });
  resetTextBoxes();
};

const resetTextBoxes = function(){
  document.querySelector("#yourname").value = "";
  document.querySelector("#youritem").value = "";
  document.querySelector("#numItems").value = "";

};
function isEmpty(str) {
  return (!str || str.length === 0 );
};

const refreshPage = async function(){
  const response = await fetch("/refresh", {
    method: "POST",
    body: ""
  })
  const text = await response.json();
  for(let i = 0; i < text.length; i++){
    addToTable(text[i])
  }
  console.log("done")
}

const remove = async function(entryIndex){
  const response = await fetch("/remove", {
    method: "POST",
    body: JSON.stringify(entryIndex),
  })
  const text = await response.json();
  //make index a string
  const entry = text[entryIndex];
  
  if(text.status === 204){
    clearTable();
    return;
  }else{
    clearTable();
    
    /*
    for(let i = 0; i < text.length; i++){
      addToTable(text[i])
    }*/
  }
  /*
  for(let i = 0; i < text.length; i++){
    addToTable(text[i])
  }*/
  console.log("Removed Entry: ", entry);
  
}

const clearTable = function(){
  document.getElementById("entryRow").remove();
}

window.onload = function () {
  refreshPage();
  const button = document.getElementById("submit");
  button.onclick = submit;
  document.addEventListener("click", function(event) {
    event.preventDefault();
    if (event.target && event.target.classList.contains("remove")) {
      const entryIndex = event.target.closest('tr').rowIndex - 1; // Subtract 1 because of table header
      remove.onclick = remove(entryIndex);
    }
  });

};
