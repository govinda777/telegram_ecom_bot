require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const crypto = require('crypto');

// Inicialização do Express
const app = express();
app.use(bodyParser.json());

// Configuração do Telegram Bot
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

// Função para criar um pagamento na CoinPayments
const createPayment = async (amount, description) => {
    const payload = {
        cmd: 'create_transaction',
        key: process.env.COINPAYMENTS_API_KEY,
        amount: amount,
        currency1: 'USD',
        currency2: 'BTC',  // Pode ser outra criptomoeda suportada pela CoinPayments
        buyer_email: 'buyer@example.com',
        item_name: description,
        format: 'json'
    };

    const headers = {
        'Content-Type': 'application/json',
        'HMAC': createHMAC(payload),
    };

    const response = await axios.post('https://www.coinpayments.net/api.php', payload, { headers });
    return response.data.result.checkout_url;
};

const createHMAC = (payload) => {
    const hmac = crypto.createHmac('sha512', process.env.COINPAYMENTS_API_SECRET);
    hmac.update(Buffer.from(new URLSearchParams(payload).toString()));
    return hmac.digest('hex');
};

// Comando /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Bem-vindo ao nosso E-commerce! Use /products para ver nossos produtos.');
});

// Comando /products
bot.onText(/\/products/, (msg) => {
    const chatId = msg.chat.id;
    const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'views/products.json')));

    let productMessage = 'Aqui estão nossos produtos:\n';
    products.forEach((product, index) => {
        productMessage += `${index + 1}. ${product.name} - ${product.price} USD\n`;
        productMessage += `Clique para comprar: /buy_${product.id}\n\n`;
    });

    bot.sendMessage(chatId, productMessage);
});

// Callback query handler
bot.on('callback_query', async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;

    if (data.startsWith('buy_')) {
        const productId = data.split('_')[1];
        const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'views/products.json')));
        const product = products.find(p => p.id === productId);

        if (product) {
            const paymentUrl = await createPayment(product.price, product.name);
            bot.sendMessage(chatId, `Clique no link para pagar: ${paymentUrl}`);
        } else {
            bot.sendMessage(chatId, 'Produto não encontrado.');
        }
    }
});

// Inicialização do servidor Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
