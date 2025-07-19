const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Optional for guest bookings
    },

    artisanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Can be assigned later
    },

    status: {
        type: String,
        enum: ['pending', 'accepted', 'decline', 'reaccept'],
        default: 'pending'
    },

    bookingDate: {
        type: Date,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },

    serviceType: {
        type: String,
        required: true
    },

    // Add these fields to store customer info directly
    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    // Keep your existing timestamps
    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
});

bookingSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Booking', bookingSchema);