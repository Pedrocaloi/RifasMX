require('dotenv').config();
const { Rifa } = require('../db');
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
  const numbers = [];

  for (let i = 1; i <= totalNumbers; i++) {
   numbers.push({
    number: i,
    available: true,
    userId: null,
   });
  }

  const rifa = await Rifa.create({
   product,
   imgProduct,
   description,
   numbersPrice,
   numbers,
  });

  res.json(rifa);
 } catch (err) {
  console.log(err.message);
 }
};

const checkRifas = async (req, res) => {
 try {
  const rifas = await Rifa.findAll();
  res.json(rifas);
 } catch (error) {
  res.status(500).json({ 'Error en el servidor: ': error.message });
 }
};

const buyRifa = async (req, res) => {
 try {
  const { rifaId, number, userId } = req.body;
  const rifa = await Rifa.findByPk(rifaId);

  console.log('antes', rifa.numbers[0]);

  const selectedNumber = rifa.numbers.find((n) => n.number === number);

  if (selectedNumber && selectedNumber.available) {
   selectedNumber.available = false;
   selectedNumber.userId = userId;

   try {
    await rifa.save();
    console.log('toy pit');
   } catch (err) {
    console.log(err.message);
   }

   console.log('despues', rifa.numbers);
   res.send({ rifa, userId }); // El número se compró exitosamente
  } else {
   res
    .status(409)
    .send(`El número ${number} de la rifa ${rifa.product} ya está comprado`); // El número ya está comprado o no existe
  }
 } catch (err) {
  res.status(500).json({ 'Error en el servidor: ': err.message });
 }
};

const rifaDetail = async (req, res) => {
 console.log('entree');
 let { id } = req.params;
 try {
  const rifa = await Rifa.findByPk(id);
  res.status(200).json(rifa);
 } catch (error) {
  res.status(500).json({ 'Error en el servidor: ': error.message });
 }
};

module.exports = {
 createRifa,
 checkRifas,
 rifaDetail,
 buyRifa,
};
