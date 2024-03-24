// FRONT-END (CLIENT) JAVASCRIPT HERE

//function to delete row
//Called when delete button in the respective row clicked
async function deleteRow(r) {
    //saving the object containing the index to remove
    let payload = JSON.stringify({index:r.getAttribute('data-index')})
    const response = await fetch( "/submit", {
        method:"DELETE",
        body: payload, //sending the object to server with delete request
    })

    const text = await response.text()
    let displayText = JSON.parse(text)
    addItem(displayText) //displaying the updated data received from server

}

//function to update row
//called when update button in the respective row clicked
async function updateRow() {
    //fetching the updated values from the form
    let updateLoad = JSON.stringify({
        updindex: document.getElementById("updindex").value,
        productname: document.getElementById("updproductname").value,
        purchasedate: document.getElementById("updpurchasedate").value,
        cost: document.getElementById("updcost").value,
        quantity: document.getElementById("updquantity").value,
        category: document.getElementById("updcategory").value,
        description: document.getElementById("upddescription").value
    })

    const response = await fetch("/submit", {
        method: "PUT",
        body: updateLoad, //sending the values to server using PUT request
    })

    const text = await response.text()
    let displayText = JSON.parse(text)
    addItem(displayText) //displaying updated data received from server
}

//function to populate popup form for updating
async function displayRow(row) {
    //setting the value for input html tag
    document.getElementById("updindex").setAttribute('value', row.getAttribute('data-updindex'))
    document.getElementById("updproductname").setAttribute('value', row.getAttribute('data-updname'))
    document.getElementById("updpurchasedate").setAttribute('value', row.getAttribute('data-dop'))
    document.getElementById("updcost").setAttribute('value', row.getAttribute('data-cost'))
    document.getElementById("updquantity").setAttribute('value', row.getAttribute('data-quantity'))
    document.getElementById("updcategory").value = row.getAttribute('data-category')
    document.getElementById("upddescription").setAttribute('value', row.getAttribute('data-desc'))
}

//function to add data when form submitted
const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
    //fetching values from the form
    const input = document.querySelector( "#productname" ),
        purchasedate = document.getElementById("purchasedate"),
        cost = document.getElementById("cost"),
        quantity = document.getElementById("quantity"),
        category = document.getElementById("category"),
        description = document.getElementById("description"),
        json = {productname: input.value,
            purchasedate: purchasedate.value,
            cost: cost.value,
            quantity: quantity.value,
            category: category.value,
            description: description.value},
        body = JSON.stringify( json ) //created json object

  const response = await fetch( "/submit", {
      method:"POST",
      body, //sending json object to server by POST request
  })

  const text = await response.text()
    let displayText = JSON.parse(text)
    addItem(displayText) //displaying data received from server

}

//function to fill the table with data
function addItem(displayText){
    let table = document.getElementById('table-body')
    let total = 0
    table.innerHTML = ""
    for(let index = 0; index<displayText.length; index++){ //looping over the array of objects received from server
        let tds = ''
        tds = `<td>
                <ul>
                    <li>Name: ${displayText[index].productname}</li>
                    <li>DOP: ${displayText[index].purchasedate}</li>
                    <li>Cost: ${displayText[index].cost}</li>
                    <li>Quantity: ${displayText[index].quantity}</li>
                    <li>Category: ${displayText[index].category}</li>
                    <li>Description: ${displayText[index].description}</li>
                </ul>
                </td>
                <td>
                <ul>
                    <li>Price: ${displayText[index].totalprice}</li>
                    <li>Discount: ${displayText[index].discount}%</li>
                    <li>After Discount: ${displayText[index].afterdiscount}</li>
                </ul>
                </td>
                <td>
                    <button onClick="deleteRow(this)" data-name = ${displayText[index].productname} data-index = ${index} id="deleteData" class="submit-btn">DELETE</button>
                    <button type="button" onclick="openPopup(); displayRow(this)" class="show-popup submit-btn" data-updindex = ${index} data-updname = ${displayText[index].productname} 
                    data-dop = ${displayText[index].purchasedate} data-cost = ${displayText[index].cost} data-quantity = ${displayText[index].quantity}
                    data-category = ${displayText[index].category} data-desc = ${displayText[index].description}>UPDATE</button>
                </td>
            `
        total = total + displayText[index].afterdiscount
        // Append to table
        let objTr = `<tr id="delRow">${tds}</tr>`
        table.innerHTML += objTr //adds row to table html

    }

    tds = `<td>
            Total Price        
                </td>
                <td>
                ${total}
                </td>
                <td>   
                </td>
            `
    let objTr = `<tr id="delRow">${tds}</tr>`
    table.innerHTML += objTr

}

window.onload = async function() {
    const button = document.querySelector("#submit");
    button.onclick = submit; //calling submit function when submit button hit

    //onload displaying the data, so data displayed on client after refreshing as well
    const response = await fetch( "/send_again", {
        method:"GET",
    })
    const text = await response.text()
    addItem(JSON.parse(text))

}

//function to show the popup
function openPopup(){
    let popup = document.getElementById('popup')
    popup.classList.add('open-popup')
}

//function to close the popup
function closePopup(){
    document.getElementById("reset").click() //reset form
    let popup = document.getElementById('popup')
    popup.classList.remove('open-popup')

}