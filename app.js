const products = [
    { name: 'Burger', price: 4.99, image: 'burger.png' },
    { name: 'Fries', price: 1.99, image: 'fries.png' },
  ];
  
  const productContainer = document.getElementById('product-container');
  
  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name} - $${product.price}</h2>
      <button onclick="initiateTransaction('${product.name}', ${product.price})">ADD</button>
    `;
    productContainer.appendChild(productDiv);
  });
  
  function initiateTransaction(productName, price) {
    fetch('/toncoin-webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productName, price }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Transaction successful!');
      } else {
        alert('Transaction failed.');
      }
    });
  }
  