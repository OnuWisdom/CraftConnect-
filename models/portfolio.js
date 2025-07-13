const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    portfolioname: {
        type: String,
        required: true,
        trim: true
    },
    portfoliodescription: {
        type: String,
        required: true,
        trim: true
    },
    servicecategory: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     // required: true // Uncomment if you want to associate with users
    // }
}, {
    timestamps: true // This will add createdAt and updatedAt automatically
});

module.exports = mongoose.model('Portfolio', portfolioSchema);