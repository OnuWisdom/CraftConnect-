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


// In your routes file
// In your routes file
router.post('/:id/accept', acceptBooking);
router.post('/:id/decline', declineBooking);

router.put('/:id/reaccept', reacceptBooking);














module.exports = router;

