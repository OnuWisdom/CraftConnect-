const express = require('express');
const router = express.Router();
const {

    createBooking,
    acceptBooking,
    declineBooking,
    reacceptBooking,
   getBookingById,
   getBooking,
} = require('../controllers/bookingController')

// const  authenticateToken  = require('../middlewares/authMiddleware');


router.get('/bookings/:id', getBookingById);
router.get('/bookings', getBooking);




router.post('/create', createBooking);

router.put('/:id/accept', acceptBooking);

router.put('/:id/decline', declineBooking);

router.put('/:id/reaccept', reacceptBooking);







module.exports = router;


// router.get('/bookings', async (req, res) => {
//     try {
//         const bookings = await Booking.find().populate('userId');
//         res.render('bookings', {
//             title: 'Booking - CraftConnect',
//             currentPage: 'become-an-artisan',
//             bookings: bookings
//         });
//     } catch (err) {
//         console.log('Error fetching bookings:', err);
//         res.render('booking', {
//             title: 'Booking - CraftConnect',
//             currentPage: 'become-an-artisan',
//             bookings: []
//         });
//     }
// });