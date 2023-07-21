require('dotenv').config();
const { Rifa, Numero, User } = require('../db');
const { mercadopago } = require('../utils/mercadoPago');
const { spawn } = require('child_process');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
 HOST_EMAIL,
 PORT_EMAIL,
 EMAIL,
 EMAIL_PASS,
 DB_HOST,
 DB_PORT,
 CLIENT_PORT,
 REACT_APP_HOST,
 AUTH_SECRET,
 AUTH_EXPIRES,
 AUTH_ROUNDS,
} = process.env;

//-------------------- Rifas Controllers --------------------------

const createRifa = async (req, res) => {
 const { product, imgProduct, description, numbersPrice, totalNumbers } =
  req.body;

 try {
  const rifa = await Rifa.create(
   {
    product,
    imgProduct,
    description,
    numbersPrice,
    numeros: [], // Incluir un array vacío para la relación 'numeros'
   },
   {
    include: 'numeros', // Incluir la relación 'numeros' al crear la rifa
   },
  );

  const numbers = [];

  for (let i = 1; i <= totalNumbers; i++) {
   numbers.push({
    number: i,
    available: true,
    RifaId: rifa.id,
   });
  }

  await Numero.bulkCreate(numbers);

  res.json(rifa);
 } catch (err) {
  console.log(err.message);
 }
};

const checkRifas = async (req, res) => {
 try {
  const rifas = await Rifa.findAll({ include: 'numeros' });
  res.json(rifas);
 } catch (error) {
  res.status(500).json({ 'Error en el servidor: ': error.message });
 }
};

const buyRifas = async (req, res) => {
 try {
  const { cartItems } = req.body;
  console.log(cartItems);

  const rifas = await Rifa.findAll({
   where: { id: cartItems.map((item) => item.rifaId) },
   include: { model: Numero, as: 'numeros', include: User },
  });

  const itemObjects = [];

  for (let i = 0; i < cartItems.length; i++) {
   const cartItem = cartItems[i];
   const { rifaId, number, userId } = cartItem;
   const rifa = rifas.find((r) => r.id === rifaId);

   const selectedNumber = rifa.numeros.find((n) => n.number === number);

   if (selectedNumber && selectedNumber.available) {
    const itemObject = {
     title: rifa.product,
     unit_price: rifa.numbersPrice,
     currency_id: 'MXN',
     quantity: 1,
    };

    itemObjects.push(itemObject);
   } else {
    res
     .status(409)
     .send(`El número ${number} de la rifa ${rifa.product} ya está comprado`);
    return;
   }
  }

  const operation = await mercadopago.preferences.create({
   items: itemObjects,
   back_urls: {
    // aca van rutas de front

    success: 'http://localhost:4000/rifas/buyRifas/success',
    pending: 'http://localhost:4000/rifas/buyRifas/pending',
    failure: 'http://localhost:4000/rifas/buyRifas/failure',
   },
   notification_url:
    // hay que loggearse para que ande en la pag de nrok
    'https://d83d-2803-9800-b444-813b-b8cb-92e2-7662-9ecf.sa.ngrok.io/rifas/buyRifas/webhook',
  });

  for (let i = 0; i < cartItems.length; i++) {
   const cartItem = cartItems[i];
   const { rifaId, number, userId } = cartItem;
   const rifa = rifas.find((r) => r.id === rifaId);

   const selectedNumber = rifa.numeros.find((n) => n.number === number);

   if (selectedNumber && selectedNumber.available) {
    selectedNumber.available = false;
    selectedNumber.userId = userId;

    // Guardar los cambios en la instancia de Número
    await selectedNumber.save();

    const user = await User.findByPk(userId);
    // Asociar el número comprado con el usuario correspondiente
    await selectedNumber.setUser(user);
   }
  }
  console.log(operation);
  res.status(200).json(operation);
 } catch (err) {
  res.status(500).json({ 'Error en el servidor: ': err.message });
 }
};

const rifaDetail = async (req, res) => {
 let { id } = req.params;
 try {
  const rifa = await Rifa.findByPk(id, { include: 'numeros' });
  console.log();
  res.status(200).json(rifa);
 } catch (error) {
  res.status(500).json({ 'Error en el servidor: ': error.message });
 }
};

const receiveWebhook = async (req, res) => {
 const payment = req.query;

 try {
  if (payment.type === 'payment') {
   console.log(req.query, ' req queryyyyy');
   const data = await mercadopago.payment.findById(payment['data.id']);
   console.log('dataa', data);
  }
  res.sendStatus(204);
 } catch (err) {
  console.log(err);
  return res.sendStatus(500).json({ error: err.message });
 }
};

module.exports = {
 createRifa,
 checkRifas,
 rifaDetail,
 buyRifas,
 receiveWebhook,
};
