const University = require('../models/university')

// Fixed function name to match import (camelCase)

exports.createUniversityEntry = async (req, res) => {
    try {
        const { institutionname, servicecategory, servicename } = req.body;
        
        // Fixed: use 'photo' variable consistently
        const photo = req.file ? req.file.filename : null;

        const newEntry = new University({
            servicename,
            institutionname,
            servicecategory,
            image: photo, // Fixed: use photo variable for image field
        });

        await newEntry.save();

        res.status(200).json({
            message: 'University data and image uploaded successfully',
            data: newEntry,
        });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error creating and uploading images' // Fixed typo: messsage -> message
        });
    } 
}