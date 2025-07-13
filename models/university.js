const mongoose = require('mongoose')

const universitySchema = new 

mongoose.Schema({

    institutionname: {

        type: String,
        required: true
    },

       fullname: {

        type: String,
        required: true
    },

       email: {

        type: String,
        required: true
    },

    servicecategory: {

        type: String,
        required: true
    },

    servicename: {

        type: String,
        required:true
    },

     image: {  
        type: String,
        required: false
    },

     rating: {

        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },

    
    location: {

        type: String,
        required: true
    },
    
    pricetier: {
        type: String,
        required: true
    },
    
    experience: {   
        type: String,
        required: true
    },
})


module.exports =
mongoose.model('University', universitySchema);