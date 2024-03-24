// FRONT-END (CLIENT) JAVASCRIPT HERE

const add = async function(event){
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
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

const receive = async function() {
  file = "/getarr"
  const filename = "public/" + file.slice( 1 )
  console.log(filename)
  const response = await fetch ("/getarr", {method:"GET"})

  const entries = await response.text()
  console.log("table:", entries)
  return JSON.parse(entries)
}

const constructTable = async function() {
  entries = await receive()
  console.log(entries)
  htmlString = ""
  for(let i = 0; i < entries.length; i++){
    row = "<tr><td>" +  entries[i].Part + "</td><td>" + entries[i].Material + "</td><td>" + entries[i].Quantity + "</td><td>" + entries[i].Weight + "</td></tr>"
    htmlString += row
    console.log(htmlString)
  }

  table_body = document.getElementById("table_body")
  table_body.innerHTML = htmlString
}

window.onload = function() {
  const add_button = document.getElementById("add_button");
  const remove_button = document.getElementById("remove_button");
  add_button.onclick = add;
  remove_button.onclick = remove;
  constructTable()
}