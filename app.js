document.addEventListener('DOMContentLoaded', function() {
    const items = [
        { id: 1, name: 'Burger', price: '4.99', imageUrl: 'path/to/burger.png' },
        { id: 2, name: 'Fries', price: '1.99', imageUrl: 'path/to/fries.png' },
        // Adicione mais itens conforme necessário
    ];

    const container = document.getElementById('item-container');
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <h3>${item.name} - $${item.price}</h3>
            <button class="add-btn" data-id="${item.id}">ADD</button>
        `;
        container.appendChild(itemDiv);
    });

    container.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-btn')) {
            const itemId = event.target.getAttribute('data-id');
            const selectedItem = items.find(item => item.id == itemId);
            if (selectedItem) {
                initiateToncoinPayment(selectedItem);
            }
        }
    });

    function initiateToncoinPayment(item) {
        const toncoinAddress = process.env.TONCOIN_WALLET_ADDRESS;
        const amount = item.price;
        const comment = `Payment for ${item.name}`;

        // Implemente a lógica para iniciar o pagamento com Toncoin aqui
        console.log(`Initiating payment of ${amount} TON to ${toncoinAddress} for ${comment}`);
    }
});
