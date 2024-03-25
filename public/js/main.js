// FRONT-END (CLIENT) JAVASCRIPT HERE

const prefix = "fas fa-"

const calculateValue = async function( event )
{
  event.preventDefault()
  try 
  {    
    const response = await fetch("/getInventory",
    {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    });
    
    if (!response.ok) 
      throw new Error("Failed to fetch inventory value");
    
    event.target.textContent = "Recalculate Value"
    
    const data = await response.json();
    const inventoryValue = data.inventoryValue;
    const inventoryWeight = data.inventoryWeight;
    const inventoryValueElement = document.getElementById("inventory-value");
    const inventoryWeightElement = document.getElementById("inventory-weight");

    inventoryValueElement.textContent  = `Inventory Value: ${inventoryValue}`;
    inventoryWeightElement.textContent = `Inventory Weight: ${inventoryWeight}`;
    inventoryValueElement.style.display = "";
    inventoryWeightElement.style.display = "";
  } 
  catch (error) 
  {
    console.error("Error:", error.message);
  }
}

const revealResults = async function( event )
{
  event.preventDefault();
  try 
  {    
    const response = await fetch("/getResults",
    {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    });
    
    if (!response.ok) 
      throw new Error("Failed to fetch results");
    
    event.target.textContent = "Re-fetch Results"
    
    const data = await response.json();
    const results = document.getElementById("results");
    const resultsText = document.getElementById("results-text");
    
    resultsText.innerHTML = ""
    data.forEach(obj => {
      const paragraph = document.createElement("p");
        paragraph.textContent = JSON.stringify(obj);
        resultsText.appendChild(paragraph);
    });
    results.style.display = "";
  }
  catch (error) 
  {
    console.error("Error:", error.message);
  }
}

const addIcon = async function( event )
{
  event.preventDefault()
  const icon = event.target
  const iconName = icon.className
  
  //Check if any empty slots before sending POST request
  let availableSlot = findAvailableSlot() 
  if(availableSlot === false)
    return;
  
  const response = await fetch("/submit",
  {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ addIcon: iconName })
  });

  if (response.ok) 
  {
    icon.remove();
    availableSlot.appendChild(icon);
  }
  else 
    console.error("Error:", response.statusText);
}

const delIcon = async function( event )
{
  event.preventDefault()
  const icon = event.target
  const iconName = icon.className

  //Ignore empty space divs
  if(icon.tagName !== 'I')
    return;
  
  const response = await fetch("/submit",
  {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ delIcon: iconName })
  });

  if (response.ok) 
  {
    icon.remove();
    let itemPool = document.getElementById("item-pool");
    itemPool.appendChild(icon);
  } else {
    console.error("Error:", response.statusText);
  }
}

function verifyTextBox(iconName)
{
  if (iconName == "")
  {
    alert("Please type an object (FOR TESTING PURPOSE, USE fish)");
    return false;
  }
  return true;
}

function createIcon(iconName)
{
    const icon = document.createElement("i");
    icon.className = prefix + iconName;
    const itemPool = document.getElementById("item-pool");
    itemPool.appendChild(icon);
}

async function displayNewData( itemName )
{
  try 
  {    
    const response = await fetch(`/getResult?itemName=${itemName}`,
    {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    });
    
    if (!response.ok) 
      throw new Error("Failed to fetch results");
        
    const data = await response.json();
    const lblResult = document.getElementById("lbl-result");
    lblResult.innerText = JSON.stringify(data);    
  }
  catch (error) 
  {
    console.error("Error:", error.message);
  }
}

const addOrModItem = async function( event )
{
  event.preventDefault();
  const txt = document.getElementById("item-name");
  const iconName = (txt.value).toLowerCase();
  
  if (!verifyTextBox(iconName))
    return;
      
  let value
  let weight;
  while(!/^\d+$/.test(value))
  {
    value = prompt("Please enter an integer for the object's value")
    if(value === null)
        return          
  }
  while(!/^\d+$/.test(weight))
  {
    weight = prompt("Please enter an integer for the object's weight")
    if(weight === null)
      return
  }
  
  const response = await fetch("/submit",
  {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ addOrModItem: iconName , value: value, weight: weight })
  });
  
  if (response.ok)
  {
    if(!itemInPool(iconName))
      createIcon(iconName)
    displayNewData(iconName)
  }
  else 
    console.error("Error:", response.statusText);
  txt.value = "";
}

const delItem = async function( event )
{
  event.preventDefault()
  const txt = document.getElementById('item-name');
  const iconName = (txt.value).toLowerCase();
  
  if (!verifyTextBox(iconName))
    return;
  
  const response = await fetch("/submit",
  {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ delItem: iconName})
  });
  if (response.ok) 
  {
    const iconToRemove = document.getElementsByClassName(prefix + iconName)[0];
    iconToRemove.remove();
  }
  else 
    console.error("Error:", response.statusText);
  txt.value = "";
}

const itemInPool = function(iconName)
{
  const iconClass = prefix + iconName;
  const iconPool = document.getElementById("item-pool");
  const iconElements = iconPool.querySelectorAll(`[class*="${prefix}"]`);
  
  for (const element of iconElements) 
    if (element.className === iconClass) 
      return true;
  
  return false;
}

window.onload = function() 
{  
  //Add onclick handlers to button
  const btnCalculateValue = document.getElementById("calculate-value");
  btnCalculateValue.onclick = calculateValue;
  
  const btnRevealResults = document.getElementById("reveal-results");
  btnRevealResults.onclick = revealResults;
  
  //Add onclick handlers to icons
  const gridIconPool = document.getElementById('item-pool');
  gridIconPool.onclick = addIcon;

  const gridInventory = document.getElementById('inventory');
  gridInventory.onclick = delIcon;
  
  const btnAddItem = document.getElementById('add-item');
  btnAddItem.onclick  = addOrModItem;
  
  const btnDelItem = document.getElementById('del-item');
  btnDelItem.onclick = delItem;
}

function findAvailableSlot()
{
  const inventory = document.getElementById("inventory");
  const emptySlots = inventory.querySelectorAll(".empty-slot");
  let result = false;
  
  for (let slot of emptySlots) 
  {
    if (slot.children.length === 0) 
    {
      result = slot;
      break;
    }
  }
  return result;
}