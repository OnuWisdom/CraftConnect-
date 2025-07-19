require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const session = require('express-session');
const redis = require('redis');

// Correct import for newer connect-redis versions
const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
         password: process.env.REDIS_PASSWORD,
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
});

redisClient.connect().catch(err => {
    console.error('Failed to connect to Redis:', err);
});

const flash = require('connect-flash');
const passport = require('passport');
require('./googleauth');

// Middleware auth checks
const { isLoggedIn, isArtisan, isUser } = require('./middlewares/authMiddleware');

// Import models
const Booking = require('./models/booking');
const University = require('./models/University');
const User = require('./models/user');


// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/test');
const indexRoutes = require('./routes/index');
const bookingRoutes = require('./routes/booking');
const portfolioRoutes = require('./routes/portfolio');
const dashboardRoutes = require('./routes/dashboard');
const contactRoutes = require('./routes/contact');
const universityRoutes = require('./routes/university');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration



app.use(session({
   store: new RedisStore({
    client: redisClient,
   }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, 
        httpOnly: true, 
        maxAge: 24 * 60 * 60 * 1000 
    }
    
}));
// app.use((req, res, next) => {
//     console.log('🔍 SESSION MIDDLEWARE CHECK:', {
//         sessionId: req.session?.id,
//         hasUser: !!req.session?.user,
//         userRole: req.session?.user?.role,
//         path: req.path
//     });
//     next();
// });
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));

// Static files
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'upload')));

// Public routes
app.get('/home', (req, res) => {
    // const welcome = req.flash('welcome') || [];
    res.render('home', {
        welcome,
        title: 'CraftConnect - Your Artisan Hub',
        currentPage: 'home'
    });
});

// app.get('/home',  async (req, res) => {
//     try {
//         const universities = await University.find(); // Fetch all artisans
//         res.render('home', {
//             title: 'CraftConnect - Your Artisan Hub',
//             currentPage: 'home',
//             universities: universities  // Pass artisans to template
//         });
//     } catch (error) {
//         console.error(error);
//         res.render('home', {
//             title: 'User-profile - CraftConnect',
//             currentPage: 'User Profile',
//             universities: []
//         });
//     }
// });

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us - CraftConnect',
        currentPage: 'about'
    });
});

// Add this to your app.js (no page needed)
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/sign-up');
});
app.get('/exploreartisans', (req, res) => {
    res.render('exploreartisans', {
        title: 'Explore Artisans - CraftConnect',
        currentPage: 'explore-artisan'
    });
});

app.get('/messages', (req, res) => {
    res.render('messages', {
        title: 'Messages Page - CraftConnect',
        currentPage: 'messages'
    });
});


app.get('/insights', (req, res) => {
    res.render('insights', {
        title: 'Insights Page - CraftConnect',
        currentPage: 'insights'
    });
});


app.get('/reviews', (req, res) => {
    res.render('reviews', {
        title: 'Review Page - CraftConnect',
        currentPage: 'reviews'
    });
});

app.get('/sign-in', (req, res) => {
    res.render('sign-up', {
        title: 'Sign-up CraftConnect',
        currentPage: 'sign-up'
    });
});

app.get('/become-an-artisan', (req, res) => {
    res.render('become-an-artisan', {
        title: 'Become an artisan - CraftConnect',
        currentPage: 'become-an-artisan'
    });
});

app.get('/notification', isLoggedIn, (req, res) => {
    res.render('notification', {
        title: 'Notification - CraftConnect',
        currentPage: 'Notification'
    });
});

app.get('/user-profile', isLoggedIn, async (req, res) => {
    try {
        const universities = await University.find(); // Fetch all artisans
        res.render('user-profile', {
            title: 'User-profile - CraftConnect',
            currentPage: 'User Profile',
            universities: universities  // Pass artisans to template
        });
    } catch (error) {
        console.error(error);
        res.render('user-profile', {
            title: 'User-profile - CraftConnect',
            currentPage: 'User Profile',
            universities: []
        });
    }
});

app.get('/exploreartisan2', isLoggedIn, (req, res) => {
    res.render('exploreartisan2', {
        title: 'Explore Artisan - CraftConnect',
        currentPage: 'Explore Artisan'
    });
});

app.get('/user-bookingform', (req, res) => {
    console.log('🔍 Booking form access:');
    console.log('Session user:', req.session?.user);
    console.log('Query artisanId:', req.query.artisanId);
    console.log('User ID being passed:', req.session?.user?._id);
    
    res.render('user-bookingform', {
        title: 'User Booking Form - CraftConnect',
        currentPage: 'User Booking Form',
        error: null,
        formData: {},
        userId: req.session?.user?._id || null,
        artisanId: req.query.artisanId || null
    });
});






app.get('/user-booking', isLoggedIn, (req, res) => {
    res.render('user-booking', {
        title: 'User Booking - CraftConnect',
        currentPage: 'User Booking'
    });
});




app.get('/user-dashboard', isLoggedIn, (req, res) => {
    res.render('user-dashboard', { user: req.session.user });
});



// Artisan dashboard (protected)
app.get('/dashboard/artisan', isLoggedIn, isArtisan, async (req, res) => {
    const artisanId = req.session.artisanId;
    if (!artisanId) return res.redirect('/sign-in');

    try {
        const artisan = await University.findById(artisanId);
        if (!artisan) return res.redirect('/become-an-artisan');

        res.render('dashboard', {
            title: 'Dashboard - CraftConnect',
            currentPage: 'dashboard',
            university: artisan
        });
    } catch (error) {
        console.error('Error fetching artisan dashboard:', error);
        res.status(500).send('Dashboard error: ' + error.message);
    }
});

// Artisan profile (session-based)
app.get('/profile', isLoggedIn, isArtisan, async (req, res) => {
    try {
        const artisanId = req.session.artisanId;
        if (!artisanId) return res.redirect('/become-an-artisan');

        const artisan = await University.findById(artisanId);
        if (!artisan) return res.redirect('/become-an-artisan');

        res.render('profile', {
            university: artisan,
            title: 'Profile - CraftConnect',
            currentPage: 'Profile'
        });
    } catch (error) {
        console.error('Error fetching artisan profile:', error);
        res.status(500).send('Error loading profile: ' + error.message);
    }
});

// Artisan profile (by ID)
app.get('/profile/:id', isLoggedIn, isArtisan, async (req, res) => {
    try {
        const artisan = await University.findById(req.params.id);
        if (!artisan) return res.status(404).send('Artisan not found');

        req.session.artisanId = artisan._id;

        res.render('profile', {
            university: artisan,
            title: 'Profile - CraftConnect',
            currentPage: 'Profile'
        });
    } catch (error) {
        console.error('Error fetching artisan:', error);
        res.status(500).send('Error loading profile: ' + error.message);
    }
});

// University form submission (become-an-artisan)
app.post('/university', async (req, res) => {
    try {
        const extractValue = (value) => Array.isArray(value) ? value[0] : value;

        const artisanData = {
            fullname: extractValue(req.body.fullname),
            email: extractValue(req.body.email),
            institutionname: extractValue(req.body.institutionname),
            servicecategory: extractValue(req.body.servicecategory),
            servicename: extractValue(req.body.servicename),
            location: extractValue(req.body.location),
            pricetier: extractValue(req.body.pricetier),
            experience: extractValue(req.body.experience),
            rating: req.body.rating || 0
        };

        const newArtisan = new University(artisanData);
        await newArtisan.save();

        await User.findByIdAndUpdate(req.session.user._id, { role: 'artisan' });
        req.session.user.role = 'artisan';

        req.session.artisanId = newArtisan._id;
        res.redirect('/profile');
    } catch (error) {
        console.error('Error creating artisan:', error);
        res.status(500).send('Error creating artisan: ' + error.message);
    }
});

// Booking Page (basic view)
app.get('/booking', isLoggedIn, async (req, res) => {
    try {
        const bookings = await Booking.find().populate('userId');
        res.render('booking', {
            title: 'Booking - CraftConnect',
            currentPage: 'become-an-artisan',
            bookings: bookings,
            booking: null
        });
    } catch (err) {
        console.log('Booking error:', err);
        res.render('booking', {
            title: 'Booking - CraftConnect',
            currentPage: 'become-an-artisan',
            bookings: [],
            booking: {}
        });
    }
});

// Sign-in page
app.get('/sign-up', (req, res) => {
    res.render('login', {
        title: 'Sign-in - CraftConnect',
        currentPage: 'sign-in'
    });
});

// Google Auth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => res.redirect('/')
);

// Use Routes
app.use('/', indexRoutes);
app.use('/contact', contactRoutes);
app.use('/university', universityRoutes);
app.use('/portfolio', isLoggedIn, isArtisan, portfolioRoutes);
app.use('/', dashboardRoutes);
app.use('/booking', bookingRoutes);
app.use('/create', bookingRoutes)
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/test', testRoutes);


// Start Server
const PORT = process.env.PORT || 5001;
connectDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
