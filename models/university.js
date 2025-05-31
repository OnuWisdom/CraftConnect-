const mongoose = require('mongoose')

const universitySchema = new 

mongoose.Schema({

    institutionname: {

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
    }

})


module.exports =
mongoose.model('University', universitySchema);