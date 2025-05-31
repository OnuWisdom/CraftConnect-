const Artisan = require('../models/artisan');


exports.getArtisans = async (req, res)=>{

    try{

        const {location, craft} = req.query;

        let query = {};
        if (location) query.location = new RegExp(`^${location}$`, "i");

        if (craft) query.craft = new RegExp(`^${craft}$`, "i");


        const artisans = await Artisan.find(query);

        res.json(artisans);

    }catch(error) {

        console.error(500).json({

            error: "Server error"
        });
    }

}