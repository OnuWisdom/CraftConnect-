const express = require('express');
const router = express.Router();
const University = require('../models/university');
const upload = require('../middlewares/uploadMiddleware');
const { createUniversityEntry } = require('../controllers/universityController');





router.get('/', (req, res) => {
    const success = req.query.success;
    const error = req.query.error;
    
    res.render('becom-an-artisan', { // Remove the leading slash
        title: 'Become-an-artisan',
        currentPage: 'becomeanartisan',
        message: success || error || null
    });
});

router.post('/', async (req, res) => {
    try {
        await University.create(req.body); // Use Contact, not contact.Model
        
       
        
        res.redirect('/become-an-artisan');
        
    } catch (error) {
        console.error(error);
        res.redirect('/become-an-artisan');
    }
});



router.post('/upload-university', upload.single('photo'), createUniversityEntry);

module.exports = router;