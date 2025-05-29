require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/test');
const indexRoutes = require('./routes/index');


const app = express();



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


app.use(expressLayouts)


// Routes
app.get('', (req,res) =>{

    res.render('index',{

          title: 'CraftConnect - Your Artisan Hub', 
           currentPage: 'index'
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


app.get('/sign-up', (req,res) =>{

    res.render('login',{

         title: ' Login- CraftConnect',
        currentPage: 'login'
    })
})

app.get('/contact', (req,res) =>{

    res.render('contact',{

         title: 'contact CraftConnect',
        currentPage: 'contact'
    })
})

app.get('/become-an-artisan', (req,res) =>{

    res.render('become-an-artisan',{

         title: 'Become an artisan - CraftConnect',
        currentPage: 'become-an-artisan'
    })
})




app.use('/', indexRoutes);


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/test', testRoutes);
app.use('/', indexRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));






const PORT = process.env.PORT || 5001;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});





