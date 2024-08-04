window.Telegram.WebApp.ready();

const items = [
    { name: "Burger", price: "$4.99", image: "https://example.com/burger.png" },
    { name: "Fries", price: "$1.99", image: "https://example.com/fries.png" },
    { name: "Hotdog", price: "$3.49", image: "https://example.com/hotdog.png" },
    { name: "Taco", price: "$3.99", image: "https://example.com/taco.png" },
    { name: "Pizza", price: "$7.99", image: "https://example.com/pizza.png" },
    { name: "Donut", price: "$1.49", image: "https://example.com/donut.png" },
];

const menu = document.getElementById('menu');

items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'menu-item';

    const itemImg = document.createElement('img');
    itemImg.src = item.image;
    itemImg.alt = item.name;

    const itemName = document.createElement('h3');
    itemName.textContent = item.name;

    const itemPrice = document.createElement('p');
    itemPrice.textContent = item.price;

    const addButton = document.createElement('button');
    addButton.textContent = 'ADD';
    addButton.addEventListener('click', () => {
        window.Telegram.WebApp.sendData(JSON.stringify({ action: 'addItem', item: item.name }));
    });

    itemDiv.appendChild(itemImg);
    itemDiv.appendChild(itemName);
    itemDiv.appendChild(itemPrice);
    itemDiv.appendChild(addButton);

    menu.appendChild(itemDiv);
});

Telegram.WebApp.onEvent('themeChanged', () => {
    document.body.style.backgroundColor = Telegram.WebApp.themeParams.bg_color || '#fff';
    document.body.style.color = Telegram.WebApp.themeParams.text_color || '#000';
    document.querySelectorAll('.menu-item button').forEach(button => {
        button.style.backgroundColor = Telegram.WebApp.themeParams.button_color || '#007bff';
        button.style.color = Telegram.WebApp.themeParams.button_text_color || '#fff';
    });
});
