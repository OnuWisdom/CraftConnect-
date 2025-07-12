require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
<<<<<<< HEAD

=======
>>>>>>> 1a325d622f68439acbdd4cf3133b03add211ab46
// const session = require('express-session');
// const flash = require('connect-flash')

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/test');
const indexRoutes = require('./routes/index');
<<<<<<< HEAD

=======
>>>>>>> 1a325d622f68439acbdd4cf3133b03add211ab46
const contactRoutes = require('./routes/contact')
const universityRoutes = require('./routes/university')

const app = express();
<<<<<<< HEAD
=======

>>>>>>> 1a325d622f68439acbdd4cf3133b03add211ab46




app.use(cors());
app.use(express.json());

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


app.get('/sign-up', (req,res) =>{

    res.render('login',{

         title: ' Sign-in - CraftConnect',
        currentPage: 'sign-in'
    })
})




app.use('/', indexRoutes);
app.use('/contact', contactRoutes);
app.use('/university', universityRoutes);






app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/test', testRoutes);
app.use('/', indexRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));






const PORT = process.env.PORT || 5001;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});







