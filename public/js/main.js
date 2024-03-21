// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
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
        body = JSON.stringify( json )

  const response = await fetch( "/submit", {
      method:"POST",
      body,
  })

  const text = await response.text()
    let displayText = JSON.parse(text)
    let table = document.getElementById('table-body')
    let index = 0
    //table.empty();
    if(displayText.length > 1){
        index = displayText.length-1
        //for(let i = 0; i<displayText.length; i++){
            let tds = ''
            tds = `<td>
                <ul>
                    <li id="data-name">Name: ${displayText[index].productname}</li>
                    <li>DOP: ${displayText[index].purchasedate}</li>
                    <li id="data-cost">Cost: ${displayText[index].cost}</li>
                    <li>Quantity: ${displayText[index].quantity}</li>
                    <li>Category: ${displayText[index].category}</li>
                    <li>Description: ${displayText[index].description}</li>
                </ul>
                </td>
                <td>
                <ul>
                    <li>Price: ${displayText[index].totalprice}</li>
                    <li>Discount: ${displayText[index].discount}</li>
                    <li>After Discount: ${displayText[index].afterdiscount}</li>
                </ul>
                </td>
                <td>
                    <button data-name = {displayText[index].productname} data-cost = {displayText[index].cost} id="deleteData" class="submit-btn">DELETE</button>
                    <a class="submit-btn" href="#popup-box">See more</a>
                </td>
            `
            // <tr> Complete! Append to table!
            let objTr = `<tr id="delRow">${tds}</tr>`
            table.innerHTML += objTr
            `<div id="popup-box" class="modal">
            <div class="content">
                <h1 class="subtitle">My Work</h1>

                <a href="#" class="box-close"></a>
            </div>
        </div>`
        //}
    }
    else{
        //for(let i = 0; i<displayText.length; i++){
            let tds = ''
            tds = `<td>
                <ul>
                    <li id="data-name">Name: ${displayText[index].productname}</li>
                    <li>DOP: ${displayText[index].purchasedate}</li>
                    <li id="data-cost">Cost: ${displayText[index].cost}</li>
                    <li>Quantity: ${displayText[index].quantity}</li>
                    <li>Category: ${displayText[index].category}</li>
                    <li>Description: ${displayText[index].description}</li>
                </ul>
                </td>
                <td>
                <ul>
                    <li>Price: ${displayText[index].totalprice}</li>
                    <li>Discount: ${displayText[index].discount}</li>
                    <li>After Discount: ${displayText[index].afterdiscount}</li>
                </ul>
                </td>
                <td>
                    <button data-name = {displayText[index].productname} data-cost = {displayText[index].cost} id="deleteData" class="submit-btn">DELETE</button>
                    <button onClick="openWindow()" class="submit-btn">UPDATE</button>
                </td>
            `
            // <tr> Complete! Append to table!
            let objTr = `<tr id="delRow">${tds}</tr>`
            table.innerHTML += objTr
        //}
    }

    console.log(typeof(displayText)+displayText.length)
  console.log( "text:", displayText )
}

window.onload = function() {
    const button = document.querySelector("#submit");
    button.onclick = submit;
}



//delete functionality
const deleteSubmit = async function( event ) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()

    const input = document.querySelector( "#productname" ),
        json = {productname: input.value,},
        body = JSON.stringify( json )

    let name = document.getElementById("data-name").value
    let cost = document.getElementById("data-cost").value
    console.log(name+cost)

    const response = await fetch( "/submitDelete", {
        method:"DELETE",
        body,
    })

    const text = await response.text()

}

window.addEventListener('click', function() {
    const delButton = document.querySelector("#deleteData");
    console.log(delButton)
    delButton.onclick = deleteSubmit;
})