const express = require('express');
const router = express.Router();
const { authenticateToken, checkRole } = require('../middlewares/authMiddleware');

router.get('/artisan/dashboard', authenticateToken, checkRole('artisan'), (req, res) => {
    res.render('artisan-dashboard', {
        title: 'Artisan Dashboard - CraftConnect',
        currentPage: 'artisan-dashboard'
    });
});

router.get('/user/dashboard', authenticateToken, checkRole('user'), (req, res) => {
    res.render('user-dashboard', {
        title: 'User Dashboard - CraftConnect',
        currentPage: 'user-dashboard'
    });
});

module.exports = router;