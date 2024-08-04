window.Telegram.WebApp.ready();

document.getElementById('sendDataButton').addEventListener('click', () => {
    const data = { action: 'buttonClicked' };
    window.Telegram.WebApp.sendData(JSON.stringify(data));
});

Telegram.WebApp.onEvent('themeChanged', () => {
    document.body.style.backgroundColor = Telegram.WebApp.themeParams.bg_color || '#fff';
    document.body.style.color = Telegram.WebApp.themeParams.text_color || '#000';
    document.querySelector('button').style.backgroundColor = Telegram.WebApp.themeParams.button_color || '#007bff';
    document.querySelector('button').style.color = Telegram.WebApp.themeParams.button_text_color || '#fff';
});
