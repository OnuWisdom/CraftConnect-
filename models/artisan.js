const mongoose = require("mongoose");

const artisanSchema = new 
mongoose.Schema({
    name:{

        type: String,
        required: true
    },

    skill:{

        type: String,
        required: true
    },

    location:{

        type: String,
        required: true
    },

    rating:{

        type: number,
        default: 0
    },

    imageURL:{

        type: String,
        default: ""
    },

});

module.exports = mongoose.model("Artisan", artisanSchema);