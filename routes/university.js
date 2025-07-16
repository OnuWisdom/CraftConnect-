const express = require('express');
const router = express.Router();
const University = require('../models/University');
const User = require('../models/user'); // Import the User model
const upload = require('../middlewares/uploadMiddleware');
const { createUniversityEntry } = require('../controllers/universityController');

// GET: Become an Artisan Form

router.get('/', (req, res) => {
    const success = req.query.success;
    const error = req.query.error;

    res.render('become-an-artisan', { 
        title: 'Become an Artisan',
        currentPage: 'becomeanartisan',
        message: success || error || null
    });
}); 




// POST: Handle form data
router.post('/', createUniversityEntry);

// POST: Handle image upload with data
router.post('/upload-university', upload.single('photo'), createUniversityEntry);

module.exports = router;
