const { Router } = require('express');

//-------------------- Controllers & Middlewares --------------------------
const { isUserLoggedIn, isUserLoggedInAdmin } = require('../middlewares/auth');
const {
 checkRifas,
 createRifa,
 rifaDetail,
 updateRifa,
 buyRifa,
} = require('../controllers/rifas.controller');

const router = Router();

//-------------------- Rifas Routes --------------------------

router.get('/checkRifas', checkRifas);

router.get('/detail/:id', rifaDetail);

router.post('/createRifa', createRifa);

// router.post('/updateRifa', isUserLoggedInAdmin, updateRifa);

// router.post('/deleteRifa', isUserLoggedInAdmin, deleteRifa);

router.put('/buyRifa', isUserLoggedIn, buyRifa);

///////////////////////////////////////////////

module.exports = router;
