/*
 * A function that sends a POST request to the server with the part entry to add to appdata
 * if the part with part_name exists, modify the entry instead of adding a new entry
 */
const add = async function(event){
  event.preventDefault()
  
  const input = document.querySelectorAll("#add_part, #add_material, #add_quantity, #add_weight"),
        json = {part_name: input.item(0).value, new_material: input.item(1).value, new_quantity: input.item(2).value,
        weight_per_unit: input.item(3).value, type: "add"},
        body = JSON.stringify(json)

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  })

  const text = await response.text()
  console.log( "Add:", text )
  constructTable()
}

/*
 * A function that sends a POST request to the server with the part to remove from appdata
 * identified by the Part Name input field (part_name)
 */
const remove = async function(event){
  event.preventDefault()

  const input = document.querySelector("#remove_part"),
        json = {part_name: input.value, type: "remove"},
        body = JSON.stringify(json)

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  })

  const text = await response.text()
  console.log( "Remove:", text )
  constructTable()
}

/*
 * A function that sends a GET request to the server for the appdata array
 * in order to pass the current content of the array (and in turn the server) to the client
 * @return: The parsed response from the server containing the array data
 */
const receive = async function() {
  file = "/getarr"
  const response = await fetch ("/getarr", {method:"GET"})
  const entries = await response.text()
  console.log("Fetched Table:", entries)
  return JSON.parse(entries)
}

/* A function that rebuilds the table content from the received appdata array */
const constructTable = async function() {
  entries = await receive()
  htmlString = ""

  for(let i = 0; i < entries.length; i++){
    row = "<tr><td>" +  entries[i].Part + "</td><td>" + entries[i].Material + "</td><td>" + entries[i].Quantity + "</td><td>" + entries[i].Weight + "</td></tr>"
    htmlString += row
  }

  table_body = document.getElementById("table_body")
  table_body.innerHTML = htmlString
}

/* 
 * A function that runs everytime the window is loaded (navigating to page or refreshing)
 * Supports the add() and remove() POST request functions
 * Supports the receive() GET request function indirectly through constructTable()
 */
window.onload = function() {
  const add_button = document.getElementById("add_button");
  const remove_button = document.getElementById("remove_button");
  add_button.onclick = add;
  remove_button.onclick = remove;
  constructTable()
}