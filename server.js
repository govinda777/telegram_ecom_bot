const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const TONCOIN_WALLET_ADDRESS = process.env.TONCOIN_WALLET_ADDRESS;
const TON_WEBHOOK_SECRET = process.env.TON_WEBHOOK_SECRET;

app.post('/toncoin-webhook', (req, res) => {
  const { productName, price } = req.body;

  // Valida o webhook
  if (req.headers['x-ton-webhook-secret'] !== TON_WEBHOOK_SECRET) {
    return res.status(403).send('Forbidden');
  }

  // Processa o pagamento recebido
  const toncoinAddress = TONCOIN_WALLET_ADDRESS;
  const amount = price; // Valor em dólares

  console.log(`Received $${amount} for ${productName}`);

  // Envia uma mensagem de confirmação ao usuário (exemplo)
  axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    chat_id: 'USER_CHAT_ID', // Id do usuário
    text: `Payment of $${amount} for ${productName} has been received.`,
  })
  .then(response => {
    res.status(200).send({ success: true, data: response.data });
  })
  .catch(error => {
    res.status(500).send({ success: false, error: error.message });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
