const mercadopago = require('mercadopago');
require('dotenv').config();
const { ACCESS_TOKEN_MP } = process.env;

mercadopago.configure({
 access_token: ACCESS_TOKEN_MP,
});

module.exports = { mercadopago };
