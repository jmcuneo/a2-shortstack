// FRONT-END (CLIENT) JAVASCRIPT HERE
async function deleteRow(r) {
    console.log(r)

    let payload = JSON.stringify({index:r.getAttribute('data-index')})
    const response = await fetch( "/submit", {
        method:"DELETE",
        body: payload,
    })

    const text = await response.text()
    let displayText = JSON.parse(text)
    addItem(displayText)
    //var i = r.parentNode.parentNode.rowIndex;
    //document.getElementById("my-table").deleteRow(i);
}

async function updateRow() {
    console.log(document.getElementById("updproductname").value)
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
        body: updateLoad,
    })

    const text = await response.text()
    let displayText = JSON.parse(text)
    addItem(displayText)
}

async function displayRow(row) {
    document.getElementById("updindex").setAttribute('value', row.getAttribute('data-updindex'))
    document.getElementById("updproductname").setAttribute('value', row.getAttribute('data-updname'))
    document.getElementById("updpurchasedate").setAttribute('value', row.getAttribute('data-dop'))
    document.getElementById("updcost").setAttribute('value', row.getAttribute('data-cost'))
    document.getElementById("updquantity").setAttribute('value', row.getAttribute('data-quantity'))
    document.getElementById("updcategory").setAttribute('value', row.getAttribute('data-category'))
    document.getElementById("upddescription").setAttribute('value', row.getAttribute('data-desc'))
}

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
    addItem(displayText)
    let index = 0
    //table.empty();



    console.log(typeof(displayText)+displayText.length)
  console.log( "text:", displayText )
}

function addItem(displayText){
    let table = document.getElementById('table-body')
    table.innerHTML = ""
    //if(displayText.length > 1){
        //index = displayText.length-1
        for(let index = 0; index<displayText.length; index++){
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
                    <li>Discount: ${displayText[index].discount}</li>
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
        // <tr> Complete! Append to table!
        let objTr = `<tr id="delRow">${tds}</tr>`
        table.innerHTML += objTr

        }
    //}
    // else{
    //     //for(let i = 0; i<displayText.length; i++){
    //     let tds = ''
    //     tds = `<td>
    //             <ul>
    //                 <li id="data-name">Name: ${displayText[index].productname}</li>
    //                 <li>DOP: ${displayText[index].purchasedate}</li>
    //                 <li id="data-cost">Cost: ${displayText[index].cost}</li>
    //                 <li>Quantity: ${displayText[index].quantity}</li>
    //                 <li>Category: ${displayText[index].category}</li>
    //                 <li>Description: ${displayText[index].description}</li>
    //             </ul>
    //             </td>
    //             <td>
    //             <ul>
    //                 <li>Price: ${displayText[index].totalprice}</li>
    //                 <li>Discount: ${displayText[index].discount}</li>
    //                 <li>After Discount: ${displayText[index].afterdiscount}</li>
    //             </ul>
    //             </td>
    //             <td>
    //                 <button onClick="deleteRow(this)" data-name = {displayText[index].productname} data-cost = {displayText[index].cost} id="deleteData" class="submit-btn">DELETE</button>
    //                 <a class="submit-btn" href="#popup-box">UPDATE</a>
    //             </td>
    //         `
    //     // <tr> Complete! Append to table!
    //     let objTr = `<tr id="delRow">${tds}</tr>`
    //     table.innerHTML += objTr
    //     const test =`<div id="popup-box" class="modal">
    //     <div class="content">
    //         <h1 class="subtitle">My Work</h1>
    //
    //         <a href="#" class="box-close"><span class="material-symbols-outlined">close</span></a>
    //     </div>
    // </div>`
        //}
}

window.onload = async function() {
    const button = document.querySelector("#submit");
    button.onclick = submit;

    const response = await fetch( "/send_again", {
        method:"GET",
    })
    const text = await response.text()
    addItem(JSON.parse(text))
    console.log(JSON.parse(text))
}



//delete functionality
// const deleteSubmit = async function( event ) {
//     // stop form submission from trying to load
//     // a new .html page for displaying results...
//     // this was the original browser behavior and still
//     // remains to this day
//     event.preventDefault()
//
//     const input = document.querySelector( "#productname" ),
//         json = {productname: input.value,},
//         body = JSON.stringify( json )
//
//     let name = document.getElementById("data-name").value
//     let cost = document.getElementById("data-cost").value
//     console.log(name+cost)
//
//     const response = await fetch( "/submit", {
//         method:"DELETE",
//         body,
//     })
//
//     const text = await response.text()
//
// }

// window.addEventListener('click', function() {
//     const delButton = document.querySelector("#deleteData");
//     console.log(delButton)
//     //delButton.onclick = deleteSubmit
// })

// const showPopup = document.querySelector("show-popup")
// const popupContainer = document.querySelector("popup-container")
// const closebtn = document.querySelector("close-btn")
//
// showPopup.onclick = () => {
//     popupContainer.classList.add('active')
// }
// closebtn.onclick = () => {
//     popupContainer.classList.remove('active')
// }


function openPopup(){
    let popup = document.getElementById('popup')
    popup.classList.add('open-popup')
}

function closePopup(){
    let popup = document.getElementById('popup')
    popup.classList.remove('open-popup')
}