const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.get('/', (req, res) => {
    const success = req.query.success;
    const error = req.query.error;
    
    res.render('contact', { // Remove the leading slash
        title: 'Contact',
        currentPage: 'contact',
        message: success || error || null
    });
});

router.post('/', async (req, res) => {
    try {
        await Contact.create(req.body); // Use Contact, not contact.Model
        
        res.redirect('/contact');
        
    } catch (error) {
        console.error(error);
        res.redirect('/contact');
    }
});

module.exports = router;
