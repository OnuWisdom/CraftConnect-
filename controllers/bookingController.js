const Booking = require('../models/booking');

// const bcrypt = require('bcryptjs');

// const jwt = require('jsonwebtoken');

exports.createBooking = async(req, res) => {

    try{

        const newBooking = 

        await Booking.create({

            artisanId: req.body.artisanId,
            userId: req.session.user._id, // Assuming req.user is set after authentication
        });

        res.status(201).json(newBooking);
        
       
    }catch (err) {

        res.status(500).json({

            message: 'Booking failed',
            error: err.message
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



// exports.getBooking = async (req, res) => {
//     try{

//         const booking = await Booking.find({

//             artisanId: req.user._id

//         });
//         .populate('userId')

//         res.json(booking);  // ✅ Send the response!

//     }catch(err){

//         console.error('Error fetching bookings:', err);

//         res.status(500).send('Server error');

//     }
// };


exports.getBooking = async (req, res) => {
    try {
        const bookings = await Booking.find({ artisanId: req.user._id })
            .populate('userId') // Optional: to see who booked
            .sort({ createdAt: -1 });

        res.json(bookings);

    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).send('Server error');
    }
};

        




        
