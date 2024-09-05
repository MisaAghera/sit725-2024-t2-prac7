const express = require('express');
const router = express.Router();
const carController = require('../controller/carController');



router.use(express.json());

router.get('/getCars', carController.getCars)

router.post('/addCar', carController.addCar);


module.exports = router;
