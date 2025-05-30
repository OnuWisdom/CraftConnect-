const mongoose = require('mongoose')

const artisanSchema = new mongoose.Schema({

    name: {

        type: String,
        required: true
    },

    craft: {

        type: String,
        required: true
    },

    address: {

        type: String,
        required: true,
    },

    lat: {

        type: Number,
        required: true
    },

    phone: String,
    email:  String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Artisan', artisanSchema);