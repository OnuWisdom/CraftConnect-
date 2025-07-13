const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const { getUserProfile, getAllUsers, uploadUserPhoto, userDashboard } = require('../controllers/userController');

router.get('/profile/:id', authenticateToken, getUserProfile);
router.get('/dashboard', authenticateToken, userDashboard);
router.get('/', authenticateToken, getAllUsers);
router.put('/:id/photo', authenticateToken, upload.single('photo'), uploadUserPhoto);

module.exports = router;