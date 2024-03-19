// FRONT-END (CLIENT) JAVASCRIPT HERE

const refreshData = async () => {
  const response = await fetch('/data');
  const data = await response.json();
  
  const tableBody = document.querySelector('#data-table tbody');
  tableBody.innerHTML = ''; // Clear existing rows
  
  data.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.model}</td>
      <td>${item.year}</td>
      <td>${item.mpg}</td>
      <td>${item.gallons}</td>
      <td><button onclick="deleteCar(${index})">Delete</button></td>
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
