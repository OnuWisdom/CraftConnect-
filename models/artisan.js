const mongoose = require("mongoose");

const ArtisanSchema = new mongoose.Schema({
    name: String,
    craft: String,
    location: String,
    phone: String,
    image: String,
});

module.exports = mongoose.model("Artisan", ArtisanSchema);