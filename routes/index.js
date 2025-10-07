// const express = require('express');
// const router = express.Router();

// router.get('/', (req, res) => {
//     res.send('API is running...');

// });

// module.exports = router;



const express = require('express');
const router = express.Router();

// Route for the homepage
// Route for the homepage
router.get('/home', (req, res) => {
    // const welcome = req.flash('welcome');
    res.render('home', {
        // welcome,
        title: 'CraftConnect - Your Artisan Hub',
        currentPage: 'home'
    });
});

// router.get('/',  async (req, res) => {
//     try {
//         const universities = await University.find(); // Fetch all artisans
//         res.render('home', {
//             title: 'CraftConnect - Your Artisan Hub',
//             currentPage: 'home',
//             universities: universities  // Pass artisans to template
//         });
//     } catch (error) {
//         console.error(error);
//         res.render('user-profile', {
//             title: 'User-profile - CraftConnect',
//             currentPage: 'User Profile',
//             universities: []
//         });
//     }
// });


// You'll also want to add your other main website routes here
// For example:
router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us - CraftConnect',
        currentPage: 'about'
    });
});

router.get('/explore-artisans', (req, res) => {
    res.render('explore-artisans', {
        title: 'Explore Artisans - CraftConnect',
        currentPage: 'explore-artisans'
    });
});

router.get('/become-an-artisan', (req, res) => {
    res.render('become-an-artisan', {
        title: 'Become an Artisan - CraftConnect',
        currentPage: 'become-an-artisan'
    });
});

router.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact Us - CraftConnect',
        currentPage: 'contact'
    });
});

// router.get('/login', (req, res) => {
//     res.render('login', {
//         title: 'Login - CraftConnect',
//         currentPage: 'login'
//     });
// });


// If you have a separate API endpoint for just checking if the API is running,
// you might put it on a different path, e.g., '/api/status' or move it to a different route file.
//  router.get('/api/status', (req, res) => {
//     res.send('API is running...');
//  });

module.exports = router;