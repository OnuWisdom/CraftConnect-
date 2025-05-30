require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const Artisan =require('./models/artisan')

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/test');
const indexRoutes = require('./routes/index');
const artisansRoutes = require('./routes/artisans');


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



// GET all artisans


// POST new artisan

// GET nearby artisans
// app.get('/api/artisans/nearby', async (req, res) => {
//   const { lat, lng, radius = 10 } = req.query;
  
//   try {
//     const artisans = await Artisan.find({});
//     const nearbyArtisans = artisans.filter(artisan => {
//       const distance = calculateDistance(lat, lng, artisan.lat, artisan.lng);
//       return distance <= radius;
//     });
//     res.json(nearbyArtisans);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch nearby artisans' });
//   }
// });

// Helper function
// function calculateDistance(lat1, lon1, lat2, lon2) {
//   const R = 6371;
//   const dLat = (lat2 - lat1) * Math.PI / 180;
//   const dLon = (lon2 - lon1) * Math.PI / 180;
//   const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//       Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
//       Math.sin(dLon/2) * Math.sin(dLon/2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//   return R * c;
// }

// Add this route temporarily to seed data
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




app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/test', testRoutes);
app.use('/', indexRoutes);
app.use('/api/', artisansRoutes),
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));






const PORT = process.env.PORT || 5001;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});





