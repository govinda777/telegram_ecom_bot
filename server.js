const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env, se disponível

const app = express();
app.use(bodyParser.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const TONCOIN_WALLET_ADDRESS = process.env.TONCOIN_WALLET_ADDRESS;
const TON_WEBHOOK_SECRET = process.env.TON_WEBHOOK_SECRET;

app.post('/toncoin-webhook', (req, res) => {
    const { address, amount, currency, comment, transaction_id } = req.body;

    // Valida o webhook
    if (req.headers['x-ton-webhook-secret'] !== TON_WEBHOOK_SECRET) {
        return res.status(403).send('Forbidden');
    }

    // Processa o pagamento recebido
    if (currency === 'TON' && address === TONCOIN_WALLET_ADDRESS) {
        console.log(`Received ${amount} TON for ${comment}`);

        // Envia uma mensagem de confirmação ao usuário
        axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: 'USER_CHAT_ID', // Id do chat do usuário
            text: `Payment of ${amount} TON for ${comment} has been received. Thank you!`
        }).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            res.status(500).send(error);
        });
    } else {
        res.status(400).send('Invalid payment details');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
