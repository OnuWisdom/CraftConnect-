require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('./googleauth');

// Import models
const Booking = require('./models/booking');
const University = require('./models/University');

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

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration (only once)
app.use(session({
    secret: process.env.SESSION_SECRET || 'mysecret',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));

// Serve static files
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Basic routes
app.get('/home', (req, res) => {
    const welcome = req.flash('welcome') || []; // Provide default empty array
    res.render('home', {
        welcome,
        title: 'CraftConnect - Your Artisan Hub', 
        currentPage: 'home'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us - CraftConnect',
        currentPage: 'about'
    });
});

app.get('/exploreartisans', (req, res) => {
    res.render('exploreartisans', {
        title: 'Explore Artisans - CraftConnect',
        currentPage: 'explore-artisan'
    });
});

app.get('/sign-in', (req, res) => {
    res.render('sign-up', {
        title: ' Sign-up CraftConnect',
        currentPage: 'sign-up'
    });
});

app.get('/become-an-artisan', (req, res) => {
    res.render('become-an-artisan', {
        title: 'Become an artisan - CraftConnect',
        currentPage: 'become-an-artisan'
    });
});

app.get('/notification', (req, res) => {
    res.render('notification', {
        title: 'Notification - CraftConnect',
        currentPage: 'Notification'
    });
});

app.get('/dashboard/artisan', async (req, res) => {
  
   const artisanId = req.session.artisanId;
    if (!artisanId) {
        return res.redirect('/become-an-artisan');
    }

    try {
        const artisan = await University.findById(artisanId);   
        if (!artisan) {
            return res.redirect('/become-an-artisan');
        }
        res.render('dashboard', {
            title: 'Dashboard - CraftConnect',
            currentPage: 'dashboard',
            university: artisan
        });
    } catch (error) {
        console.error('Error fetching artisan for dashboard:', error);
        res.status(500).send('Error fetching artisan for dashboard: ' + error.message);
    }
});

// Profile route
    app.get('/profile', async (req, res) => {
    try {
        const artisanId = req.session.artisanId;
        
        if (!artisanId) {
            return res.redirect('/become-an-artisan');
        }
        
        const artisan = await University.findById(artisanId);
        
        if (!artisan) {
            return res.redirect('/become-an-artisan');
        }
        
        // Pass as 'university' to match your EJS template
        res.render('profile', { 
            university: artisan,
            title: 'Profile - CraftConnect',
            currentPage: 'Profile'
        });
        
    } catch (error) {
        console.error('Error fetching artisan:', error);
        res.status(500).send('Error fetching artisan profile: ' + error.message);
    }
});

//Profile route with ID parameter
app.get('/profile/:id', async (req, res) => {
    try {
        const artisanId = req.params.id;
        const artisan = await University.findById(artisanId);
        
        if (!artisan) {
            return res.status(404).send('Artisan not found');
        }
        
        // Store in session for future use
        req.session.artisanId = artisanId;
        
        res.render('profile', { 
            university: artisan,
            title: 'Profile - CraftConnect',
            currentPage: 'Profile'
        });
        
    } catch (error) {
        console.error('Error fetching artisan:', error);
        res.status(500).send('Error fetching artisan profile: ' + error.message);
    }
});
// University form submission
app.post('/university', async (req, res) => {
    try {
        console.log('Form data received:', req.body);

        // Helper function to extract string value from potential array
        const extractValue = (value) => {
            if (Array.isArray(value)) {
                return value[0];
            }
            return value;
        };

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

        // Save to database
        const newArtisan = new University(artisanData);
        await newArtisan.save();

        console.log('Artisan saved:', newArtisan);

        // Store ID in session and redirect to profile
        req.session.artisanId = newArtisan._id;
        res.redirect('/profile');
        
    } catch (error) {
        console.error('Error creating artisan:', error);
        res.status(500).send('Error creating artisan profile: ' + error.message);
    }
});;

// Booking route
app.get('/booking', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('userId');
        res.render('booking', {
            title: 'Booking - CraftConnect',
            currentPage: 'become-an-artisan',
            bookings: bookings,
            booking: null
        });
    } catch (err) {
        console.log('Error fetching bookings:', err);
        res.render('booking', {
            title: 'Booking - CraftConnect',
            currentPage: 'become-an-artisan',
            bookings: [],
            booking: { userId: { name: '' }, date: '', service: '', location: '', price: '', status: '', _id: '' }
        });
    }
});

app.get('/sign-up', (req, res) => {
    res.render('login', {
        title: ' Sign-in - CraftConnect',
        currentPage: 'sign-in'
    });
});

// Google Auth routes
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/auth/google/callback', 
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => res.redirect('/')
);

// Route middleware
app.use('/', indexRoutes);
app.use('/contact', contactRoutes);
app.use('/university', universityRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/', dashboardRoutes);
app.use('/booking', bookingRoutes);
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/test', testRoutes);

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});