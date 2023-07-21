const { Router } = require('express');

//-------------------- Controllers & Middlewares --------------------------
const { isUserLoggedIn, isUserLoggedInAdmin } = require('../middlewares/auth');
const {
 checkRifas,
 createRifa,
 rifaDetail,
 buyRifas,
 receiveWebhook,
} = require('../controllers/rifas.controller');

const router = Router();

//-------------------- Rifas Routes --------------------------

router.get('/checkRifas', checkRifas);

router.get('/detail/:id', rifaDetail);

router.post('/createRifa', createRifa);

// router.post('/updateRifa', isUserLoggedInAdmin, updateRifa);

// router.post('/deleteRifa', isUserLoggedInAdmin, deleteRifa);

//-------------------- Number payment routes --------------------------

// router.put('/buyRifas', isUserLoggedIn, buyRifas);

router.put('/buyRifas', buyRifas);

router.get('/buyRifas/success', (req, res) => res.send('creating order'));

router.get('/buyRifas/pending', (req, res) => res.send('pending order'));

router.get('/buyRifas/failure', (req, res) => res.send('order failure'));

router.get('/buyRifas/webhook', receiveWebhook);

///////////////////////////////////////////////

module.exports = router;
