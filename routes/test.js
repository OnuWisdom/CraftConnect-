const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const TestSchema = new
mongoose.Schema({message: String});
const TestModel =
mongoose.model('Test', TestSchema);

router.get('/', async (req,res) => {
    try{
        const testDoc = new
        TestModel({message: 'Hello from test route'});

        await testDoc.save();
        res.send('Data saved to DB');
    }catch(error) {
        res.status(500).send('Error saving data');
    }
});

module.exports = router;