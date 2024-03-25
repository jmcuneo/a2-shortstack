// FRONT-END (CLIENT) JAVASCRIPT HERE
const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  const input = document.querySelector( "#yourname" ),
        json = { yourname: input.value },
        body = JSON.stringify( json ) //turns to string and put through the network

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  }).then(response => response.json()).then(function(json) {
    console.log(json)
  })

  const text = await response.text()

  console.log( "text:", text )
}

const add = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()


  //Check if the element exists, if so set #ordered to +=1
  let itemExists = document.getElementById("");

  let item = document.createElement("div");
  item.setAttribute("id", "orderItem");
  let text = document.createTextNode("Added the item to order");
  item.appendChild(text);
  let remove = document.createElement('button');
  
  //Button to remove order items after adding
  remove.addEventListener('click', function(){
    item.remove();
  });
  remove.innerText = "Remove item";
  item.appendChild(remove);
  
  document.querySelector("#order").appendChild(item);

}


const startNewOrder = function(event){
  //Creates a new order form
  let orderForm = document.getElementById("order");

  if(!(orderForm === null)){
    orderForm.remove();
  }
    let order = document.createElement("form");
    order.setAttribute("id",  "order");
    
    let itemSelect = document.createElement("button");
    itemSelect.setAttribute('id', 'itemSelect');
    itemSelect.innerText = "Add item to order";

    let text = document.createElement('input');
    text.setAttribute('id', 'yourname');
    text.setAttribute('placeholder', "Name for the order")

    let submit = document.createElement("button");
    submit.setAttribute('id', 'submit');
    submit.innerText = "submit";

    order.appendChild(itemSelect);
    order.appendChild(text);
    order.appendChild(submit);
    let check = document.getElementById("orders");
    document.body.append(order);
    const button = document.querySelector("#itemSelect");
    button.onclick = add;
} 

const checkOrders = async function(event){
  //Change page bttn, should write to recieve url string
  const response = await fetch( "html/results.html", {
    method:"GET",
  }).then(response => window.location.href = response.url).then(response => console.log(response.url))
} 


window.onload = function(){
  const button = document.querySelector("#itemSelect");
  button.onclick = add;
  const submitbutton = document.querySelector("#submit");
  submitbutton.onclick = submit;
}
