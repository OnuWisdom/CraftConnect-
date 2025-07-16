const mongoose = require('mongoose');

const bookingSchema = new
mongoose.Schema({

    userId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    artisanId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },


    status: {

        type: String,
        enum:['pending', 'accepted', 'decline','reaccept'],
        default: 'pending'
    },

    bookingDate: {

        type: Date,
        default: Date.now
    },

    location: {

        type: String
    },

       price: {

        type: String
    },

    serviceType: {

        type: String,
        required: true,

    },
});

module.exports = mongoose.model('Booking', bookingSchema);