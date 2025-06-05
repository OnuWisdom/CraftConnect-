const Artisan = require('../models/artisan');

const getArtisans = async (req,res) => {

    try{

        const {search} = req.query;
        let filter = {};

        if (search && search.trim().length > 0){

            const regex = new 

            RegExp(search.trim(), 'i');
            filter = {

                $or: [

                    {name: regex},
                    
                    {location: regex},
                    
                    {skill: regex}
                ]
            };
        }

        const artisans = await Artisan.find(filter).select('-__v').sort({rating: -1});

        return 

        res.status(200).json(artisan);

    }catch(err){

        console.error('Error in getArtisans:', err);

        return res.status(500).json({

            message: 'Server Error: Could not fetch artisans. '
        });
    };
}

module.exports = {

    getArtisans,
};