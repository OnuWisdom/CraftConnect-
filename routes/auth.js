const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/authController');

// Add debug middleware to see if routes are being hit
router.use((req, res, next) => {
    console.log('🔍 AUTH ROUTE HIT:', {
        method: req.method,
        url: req.url,
        body: req.body,
        timestamp: new Date().toISOString()
    });
    next();
});

router.post('/register', registerUser);

// Add specific debug for login route
router.post('/login', (req, res, next) => {
    console.log('🔍 LOGIN ROUTE SPECIFICALLY HIT!');
    console.log('🔍 Login Body:', req.body);
    next();
}, loginUser);

module.exports = router;