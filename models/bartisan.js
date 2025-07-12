const mongoose = require('mongoose');


const bartisanchema= new
mongoose.Schema({

    servicecategory: {

        type: String,
        required: true,
        trim: true,
    },

    servicename: {

        type: String,
        required: true,
        unique: true,
        trim: true,
    
    },


     institutionname: {

        type: String,
        required: true,
        unique: true,
        trim: true,
    
    },

    


}, {timestamps: true });

module.exports = 
mongoose.model('Bartisan', bartisanchema);