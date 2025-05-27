const mongoose = require('mongoose');

const userSchema = new
mongoose.Schema({

    photo: {

        type: String,
        default: null,
    },

    fullname: {

        type: String,
        required: true,
        trim: true,
    },

    username: {

        type: String,
        required: true,
        unique: true,
        trim: true,
    
    },

    email:{

        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {

        type: String,
        required: true,
    },

    useUsername: {

        type: Boolean,
        default: false,
    }


}, {timestamps: true });

module.exports = 
mongoose.model('User', userSchema);