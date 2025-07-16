// const express = require('express');
// const router = express.Router();
// const portfolioController = require('../controllers/portfolioController');
// const { isLoggedIn, isArtisan } = require('../middlewares/authMiddleware');

// const upload = require('../middlewares/uploadMiddleware'); // Your existing multer middleware



// router.get('/', isLoggedIn, isArtisan, portfolioController.getPortfolio);

// router.get('/add', isLoggedIn, isArtisan, portfolioController.getAddPortfolio);

// router.post('/add', upload.single('image'), portfolioController.postAddPortfolio);

// module.exports = router;




const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const { isLoggedIn, isArtisan } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Add debugging middleware to track session through the chain
router.use((req, res, next) => {
    console.log('🔍 PORTFOLIO ROUTE DEBUG:', {
        method: req.method,
        url: req.url,
        hasSession: !!req.session,
        hasUser: !!req.session?.user,
        userRole: req.session?.user?.role,
        sessionId: req.session?.id
    });
    next();
});

// Portfolio routes with proper middleware chain
router.get('/', isLoggedIn, isArtisan, portfolioController.getPortfolio);

router.get('/add', isLoggedIn, isArtisan, portfolioController.getAddPortfolio);

// Fix: Add the missing middlewares to the POST route
router.post('/add', isLoggedIn, isArtisan, upload.single('image'), portfolioController.postAddPortfolio);

module.exports = router;