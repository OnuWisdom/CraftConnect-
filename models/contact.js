const mongoose = require('mongoose')

const contactSchema = new 
mongoose.Schema({

    fullname: {

        type: String,
        required: true
    },

    email: {

        type: String,
        required: true
    },

    message: {

        type: String,
        required:true
    },

    phone: {

        type: String,
    },

    subject: {

        type: String,
        enum: [ 'Partnership', 'Support', 'General Inquiry']
    }

}, {timestamps: true });

module.exports =
mongoose.model('Contact', contactSchema);
