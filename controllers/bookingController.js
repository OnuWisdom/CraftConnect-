const Booking = require('../models/booking');

// const bcrypt = require('bcryptjs');

// const jwt = require('jsonwebtoken');


exports.createBooking = async (req, res) => {
  try {
    const { userId, artisanId, fullName, email, phone, price, location, serviceType, message } = req.body;
    
    console.log('=== BOOKING REQUEST DEBUG ===');
    console.log('Request body:', req.body);
    console.log('Session user:', req.session.user);
    
    // Create booking with flattened structure
    const bookingData = {
      userId,
      artisanId,
      serviceType,
      location,
      price: parseInt(price),
      bookingDate: req.body.bookingDate || undefined,
      // These fields should be at root level, not nested
      fullName,
      email,
      phone,
      message
    };
    
    console.log('Creating booking with data:', bookingData);
    
    const booking = new Booking(bookingData);
    await booking.save();
    
  res.redirect('/user-profile')
    
  } catch (error) {
    console.error('=== BOOKING ERROR ===');
    console.error('Error details:', error);
    console.error('Stack trace:', error.stack);
    
    res.status(400).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message
    });
  }
};




exports.acceptBooking = async (req, res) => {

    try{

        const booking = 

        await Booking.findByIdAndUpdate(req.params.id,

            {status: 'accepted'},
            { new:true 


            });
            res.json(booking);
        
        
        }catch(err) {

            res.status(500).json({

                message: 'Failed to accept booking'
            });
        };

    };

    exports.declineBooking  = async (req, res) => {

            try{

                const booking = await Booking.findByIdAndUpdate(req.params.id,

                    {status: 'declined'},
                    { new: true}
                );
                res.json(booking);

            }catch(err) {

                res.status(500).json({

                    message: 'Failed to decline booking'
                });
            };
        };


          exports.reacceptBooking  = async (req, res) => {

            try{

                const booking = await Booking.findByIdAndUpdate(req.params.id,

                    {status: 'accepted'},
                    { new: true}
                );
                res.json(booking);

            }catch(err) {

                res.status(500).json({

                    message: 'Failed to reaccept booking'
                });
            };
        };


     exports.getBookingById = async (req, res) => {

    try {
        // console.log('Route hit');

        const booking = await Booking.findById(req.params.id).populate('artisanId');

        // console.log('Booking found:', booking);
        // console.log('UserId populated:', booking?.userId);
        
        if (!booking) {
            return res.status(404).send('Booking not found');
        }
        
        res.render('booking', { booking });
        
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('Server error');
    }
};




exports.getBooking = async (req, res) => {
    try {
        console.log('=== GET BOOKING DEBUG ===');
        console.log('Session user:', req.session.user);
        console.log('Session artisanId:', req.session.artisanId);
        
        // Use the artisanId from session, not user._id
        const artisanId = req.session.artisanId;
        
        if (!artisanId) {
            console.log('❌ No artisan ID found in session');
            return res.redirect('/become-artisan');
        }

        const bookings = await Booking.find({ artisanId: artisanId })
            .populate('userId', 'fullname username email') // Populate user info
            .populate({
                path: 'artisanId',
                model: 'University', // Make sure this matches your University model name
                select: 'fullname institutionname servicename email artisanId'
            })
            .sort({ createdAt: -1 });

        console.log('=== FOUND BOOKINGS ===');
        console.log('Number of bookings:', bookings.length);
        
        bookings.forEach((booking, index) => {
            console.log(`Booking ${index + 1}:`, {
                id: booking._id,
                artisanName: booking.artisanId?.fullname || 'No artisan name',
                userName: booking.userId?.fullname || booking.userId?.username || booking.fullName || 'No user name',
                serviceType: booking.serviceType,
                status: booking.status,
                price: booking.price,
                location: booking.location
            });
        });

        // Render the template instead of sending JSON
        res.render('/dashboard-artisan', { bookings }); // Replace with your actual template name
        
        // Alternative: If you want to keep JSON response for AJAX calls
        // res.json({ success: true, bookings });

    } catch (err) {
        console.error('❌ Error fetching bookings:', err);
        res.status(500).send('Server error');
    }
};
        




        
