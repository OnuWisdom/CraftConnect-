const express = require('express');
const router = express.Router();
const { isLoggedIn, isUser } = require('../middlewares/authMiddleware');

const upload = require('../middlewares/uploadMiddleware');

const { getUserProfile, getAllUsers, uploadUserPhoto, userDashboard } = require('../controllers/userController');

router.get('/profile/:id', isLoggedIn, getUserProfile);
router.get('/dashboard', isLoggedIn, isUser, userDashboard); // restrict to only users if needed
router.get('/', isLoggedIn, getAllUsers);
router.put('/:id/photo', isLoggedIn, upload.single('photo'), uploadUserPhoto);


module.exports = router;