const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
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


    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },


    password: {
        type: String,
        required: true,
        minlength: 6, // Add minimum length
    },


    useUsername: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

// Hash password before saving
userSchema.pre('save', async function(next) {


    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    next();
    
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);