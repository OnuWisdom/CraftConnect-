const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const upload = require('../middlewares/uploadMiddleware'); // Your existing multer middleware



router.get('/', portfolioController.getPortfolio);

router.get('/add', portfolioController.getAddPortfolio);

router.post('/add', upload.single('image'), portfolioController.postAddPortfolio);

module.exports = router;