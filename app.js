require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const session = require('express-session');
const Booking = require('./models/booking');
const flash = require('connect-flash');

const passport = require('passport');
require('./googleauth');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/test');
const indexRoutes = require('./routes/index');
const bookingRoutes = require('./routes/booking')
const portfolioRoutes = require('./routes/portfolio');
const dashboardRoutes = require('./routes/dashboard');



const contactRoutes = require('./routes/contact')
const universityRoutes = require('./routes/university')

const app = express();







app.use(cors());
app.use(express.json());

app.use(session( {

    secret: process.env.SESSION_SECRET || 'mysecret',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(express.urlencoded({ extended: true }));




// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));

// Serve static files
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));





// Routes
app.get('/home', (req,res) =>{

    res.render('home',{

          title: 'CraftConnect - Your Artisan Hub', 
           currentPage: 'home'
    })
})



app.get('/about', (req,res) =>{

    res.render('about',{
        title: 'About Us - CraftConnect',
        currentPage: 'about'
    })
    
})

app.get('/exploreartisans', (req,res) =>{

    res.render('exploreartisans',{

      title: 'Explore Artisans - CraftConnect',
     currentPage: 'explore-artisan'
    })
})


app.get('/sign-in', (req,res) =>{

    res.render('sign-up',{

         title: ' Sign-up CraftConnect',
        currentPage: 'sign-up'
    })
})


app.get('/become-an-artisan', (req,res) =>{

    res.render('become-an-artisan',{

         title: 'Become an artisan - CraftConnect',
        currentPage: 'become-an-artisan'
    })
})

app.get('/notification', (req,res) =>{

    res.render('notification',{

         title: 'Notification - CraftConnect',
        currentPage: 'Notification'
    })
})


app.get('/dashboard/artisan', (req,res) =>{

    res.render('dashboard',{

         title: 'Dashboard - CraftConnect',
        currentPage: 'Dashboard'
    })
})




app.get('/profile', (req,res) =>{

    res.render('profile',{

         title: 'Profile - CraftConnect',
        currentPage: 'Profile'
    })
})




// app.get('/profile', (req,res) =>{

//     res.render('profile',{

//          title: 'Profile - CraftConnect',
//         currentPage: 'Profile'
//     })
// })


app.use('/portfolio', portfolioRoutes);







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


       
app.use('/', bookingRoutes);


app.get('/sign-up', (req,res) =>{

    res.render('login',{

         title: ' Sign-in - CraftConnect',
        currentPage: 'sign-in'
    })
})

//Google Login/Sign-Up Routes
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile','email']
}));

app.get('/auth/google/callback', 

    passport.authenticate('google', {

        failureRedirect: '/'
    }),

    (req, res) => res.redirect('/')
);



app.use(session({

    secret:'replace-this-with-env-secret',
    resave:false,
    saveUninitialized:false,
}));
app.use(flash());




app.use('/', indexRoutes);
app.use('/contact', contactRoutes);
app.use('/university', universityRoutes);


app.use('/', dashboardRoutes)
app.use('/booking', bookingRoutes);



app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/test', testRoutes);
app.use('/', indexRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));






const PORT = process.env.PORT || 5001;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});







