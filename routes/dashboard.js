const express = require('express');
const router = express.Router();
const { isLoggedIn, isArtisan, isUser } = require('../middlewares/authMiddleware');
const University = require('../models/University');

router.get('/dashboard/user', isLoggedIn, isUser, (req, res) => {
    res.render('home', {
        title: 'User Dashboard',
        currentPage: 'home',
        user: req.session.user
    });
});

router.get('/dashboard/artisan', isLoggedIn, isArtisan, async (req, res) => {
    console.log('🔍 DASHBOARD DEBUG START');
    console.log('🔍 Session user:', req.session.user);
    console.log('🔍 User email:', req.session.user?.email);
    
    const userEmail = req.session.user.email;
    
    try {
        // Debug: Check what's in the database
        const allUniversities = await University.find({});
        console.log('🔍 ALL UNIVERSITIES IN DB:', allUniversities.map(u => ({
            id: u._id,
            email: u.email,
            institutionname: u.institutionname
        })));
        
        // Try to find the specific university
        const university = await University.findOne({ email: userEmail });
        console.log('🔍 FOUND UNIVERSITY FOR EMAIL:', userEmail);
        console.log('🔍 UNIVERSITY DATA:', university);
        
        if (!university) {
            console.log('❌ No university found for email:', userEmail);
            return res.redirect('/become-an-artisan');
        }
        
        res.render('artisan-dashboard', {
            title: 'Artisan Dashboard',
            currentPage: 'dashboard',
            university: university
        });
        
    } catch (error) {
        console.error('❌ Error:', error);
        res.redirect('/login');
    }
});


// router.get('/dashboard/artisan', isLoggedIn, isArtisan, async (req, res) => {
//     const userEmail = req.session.user.email; // Get email from session
    
//     try {
//         // Fetch the university data from database
//         const university = await University.findOne({ email: userEmail });
        
//         if (!university) {
//             return res.redirect('/become-an-artisan');
//         }
        
//         res.render('artisan-dashboard', {
//             title: 'Artisan Dashboard',
//             currentPage: 'dashboard',
//             university: university  // ✅ This will work now
//         });
        
//     } catch (error) {
//         console.error('Error:', error);
//         res.redirect('/login');
//     }
// });

// router.get('/dashboard/artisan', isLoggedIn, isArtisan, async (req, res)  => {

//     const artisanId = req.session.user._id;
//     if (!artisanId) {
//         res.redirect('/become-an-artisan');
        
//     }

//     try {
//         // Fetch artisan-specific data from database
//         const artisan = await Artisan.findById(artisanId); // Adjust based on your model
//         const bookings = await Booking.find({ artisanId: artisanId });
//         const portfolio = await Portfolio.find({ artisanId: artisanId });
        
//         res.render('artisan-dashboard', {
//             title: 'Artisan Dashboard',
//             currentPage: 'dashboard',
//             bookings: bookings,
//             portfolio: portfolio,
//              university: artisan
//         });
//     } catch (error) {
//         console.error('Error fetching artisan data:', error);
//         res.redirect('/login');
//     }

// });


module.exports = router;