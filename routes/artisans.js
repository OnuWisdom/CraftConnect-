const express = require('express');
const router = express.Router();
const Artisan = require('../models/artisan');


router.get('/api/artisans', async  (req, res)=>{

    try{

        const artisans =  await Artisan.find({});
        res.json(artisans);

    }catch(err){

        console.error(error);
      res.status(500).json({

        error: 'Failed to fetch artisans'
      });
    }
});




// GET artisans by location (optional - for more advanced filtering)
router.get('/api/artisans/nearby', async (req, res) => {
  const { lat, lng, radius = 10 } = req.query;
  
  try {
    // Simple distance calculation - you could use MongoDB's $geoNear for better performance
    const artisans = await Artisan.find({});
    
    const nearbyArtisans = artisans.filter(artisan => {
      const distance = calculateDistance(lat, lng, artisan.lat, artisan.lng);
      return distance <= radius;
    });
    
    res.json(nearbyArtisans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch nearby artisans' });
  }
});

// Helper function
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

module.exports = router;