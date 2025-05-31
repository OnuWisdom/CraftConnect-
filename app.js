require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const Artisan =require('./models/artisan');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/test');
const indexRoutes = require('./routes/index');
const artisansRoutes = require('./routes/artisans');
const contactRoutes = require('./routes/contact')


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

         title: ' login - CraftConnect',
        currentPage: 'login'
    })
})




app.use('/', indexRoutes);
app.use('/contact', contactRoutes);

// app.post('/api/seed', async (req, res) => {
//   const sampleArtisans = [
//     {
//       name: "John Adebayo",
//       craft: "Wood Carving",
//       address: "Lagos Island, Lagos",
//       lat: 6.4541,
//       lng: 3.3947,
//       phone: "08012345678"
//     },
//     {
//       name: "Fatima Hassan", 
//       craft: "Pottery",
//       address: "Ikeja, Lagos",
//       lat: 6.5952,
//       lng: 3.3374,
//       phone: "08087654321"
//     },
//     {
//       name: "Ahmed Ibrahim",
//       craft: "Leather Work",
//       address: "Victoria Island, Lagos", 
//       lat: 6.4281,
//       lng: 3.4219,
//       phone: "08098765432"
//     }
//   ];

//   try {
//     await Artisan.insertMany(sampleArtisans);
//     res.json({ message: 'Sample data added successfully!' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });




app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/test', testRoutes);
app.use('/', indexRoutes);
app.use('/api/', artisansRoutes),
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));






const PORT = process.env.PORT || 5001;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});







