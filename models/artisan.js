const mongoose = require("mongoose");

const ArtisanShema = new ({

    name: String,
    craft: String,
    location: String,
     phone: String,
    image: String,
})



module.exports = 
mongoose.model("Artisan", ArtisanSchema );