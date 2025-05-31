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
        res.redirect('/contac');
    }
});

module.exports = router;





 // const {fullname, email, phone, subject, message} = req.body

    // try{

    //     const newContact = new 
        
    //     Contact({ fullname, email, phone, subject, message});

    //     await newContact.save();

    //     res.status(200).json({

    //         success: true,
    //         message: 'Message Sent'
    //     });

        
    // }catch(error){

    //       res.status(500).json({

    //         success: false,
    //         message: 'Server Error'
    //     });
    // }