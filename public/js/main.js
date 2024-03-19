// FRONT-END (CLIENT) JAVASCRIPT HERE

const refreshData = async () => {
  const response = await fetch('/data');
  const data = await response.json();
  
  const tableBody = document.querySelector('#data-table tbody');
  tableBody.innerHTML = ''; // Clear existing rows
  
  data.forEach((item, index) => {
    // Calculate the range for each car
    const range = item.mpg * item.gallons;
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td contenteditable="true">${item.model}</td>
      <td contenteditable="true">${item.year}</td>
      <td contenteditable="true">${item.mpg}</td>
      <td contenteditable="true">${item.gallons}</td>
      <td>${range}</td>
      <td class="action-cell">
    <button class="delete-button" onclick="deleteCar(${index})">Delete</button>
    <button class="update-button" onclick="updateCar(${index}, this.parentElement.parentElement)">Update</button>
  </td>
  `;
    tableBody.appendChild(row);
  });
};


const addCar = async (event) => {
  event.preventDefault();
  
  const model = document.querySelector('#model').value;
  const year = document.querySelector('#year').value;
  const mpg = document.querySelector('#mpg').value;
  const gallons = document.querySelector('#gallons').value;
  
  const response = await fetch('/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, year, mpg, gallons })
  });
  
  if (response.ok) {
    refreshData();
  }
};



const updateCar = async (index, row) => {
  const updatedData = {
    model: row.children[0].innerText,
    year: parseInt(row.children[1].innerText),
    mpg: parseInt(row.children[2].innerText),
    gallons: parseInt(row.children[3].innerText)
  };

  if (isNaN(updatedData.year) || isNaN(updatedData.mpg) || isNaN(updatedData.gallons)) {
    alert("Please enter valid numbers for year, mpg, and gallons.");
    return;
  }

  const response = await fetch('/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index, updatedData })
  });

  if (response.ok) {
    refreshData();
  }
};



const deleteCar = async (index) => {
  const response = await fetch('/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index })
  });
  
  if (response.ok) {
    refreshData();
  }
};

window.onload = function() {
  document.querySelector('#data-form').onsubmit = addCar;
  document.querySelector('#refresh-button').onclick = refreshData;
  refreshData(); // Load initial data
};
