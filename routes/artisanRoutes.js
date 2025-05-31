const express = require('express');
const router = express.Router();


const artisanController = require('../controllers/artisanController');


router.get('/', artisanController.getaArtisans);


module.exports = router;