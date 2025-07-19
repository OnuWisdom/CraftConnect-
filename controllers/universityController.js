const University = require('../models/University')
const User = require('../models/user'); // ✅ Needed to update user role
const { v4: uuidv4 } = require('uuid');


exports.createUniversityEntry = async (req, res) => {
    try {
        const sessionUser = req.session.user;
        if (!sessionUser) {
            console.log('❌ No session user found');
            return res.redirect('/auth/login');
        }
// Add this right after getting sessionUser
console.log('🔍 SESSION USER ID:', sessionUser._id);
console.log('🔍 FULL SESSION USER:', sessionUser);

// Add this right before saving
console.log('🔍 ARTISAN ID BEING SAVED:', newEntry.artisanId);

        const {
            institutionname,
            servicecategory,
            servicename,
            email,
            rating,
            fullname,
            location,
            pricetier,
            experience,
        } = req.body;

        // Validate required fields
        if (!institutionname || !servicecategory || !servicename || !location) {
            console.log('❌ Missing required fields');
            return res.redirect('/become-artisan?error=missing_fields');
        }

        const photo = req.file ? req.file.filename : null;

        // Create University entry
        const newEntry = new University({
            institutionname,
            servicecategory,
            servicename,
            email,
            rating,
            fullname,
            location,
            pricetier,
            experience,
            image: photo,
           artisanId: uuidv4()
        });

        await newEntry.save();
        console.log('✅ University entry created:', newEntry._id);

        // Update user role in database
        console.log('🔍 UPDATING USER ROLE TO ARTISAN...');
        const updatedUser = await User.findByIdAndUpdate(
            sessionUser._id, 
            { role: 'artisan' },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            console.log('❌ Failed to update user role - user not found');
            return res.redirect('/become-artisan?error=user_not_found');
        }

        console.log('✅ USER ROLE UPDATED SUCCESSFULLY:', {
            userId: updatedUser._id,
            oldRole: sessionUser.role,
            newRole: updatedUser.role
        });

        // Update session with fresh user data (without password)
        req.session.user = {
            _id: updatedUser._id,
            fullname: updatedUser.fullname,
            username: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role // This should now be 'artisan'
        };

        req.session.artisanId = newEntry._id;

        console.log('🔍 SESSION AFTER UPDATE:', {
            sessionRole: req.session.user.role,
            sessionId: req.session.user._id,
            artisanId: req.session.artisanId
        });

        // Force session save before redirect
        req.session.save((err) => {
            if (err) {
                console.error('❌ Session save error:', err);
                return res.redirect('/become-artisan?error=session_save_failed');
            }
            
            // console.log('✅ Session saved successfully, redirecting to artisan dashboard');
            return res.redirect('/dashboard/artisan');
        });

    } catch (err) {
        console.error('❌ Error in createUniversityEntry:', err);
        
        // More specific error handling
        if (err.name === 'ValidationError') {
            console.log('❌ Validation error:', err.message);
            return res.redirect('/become-artisan?error=validation_failed');
        }
        
        if (err.code === 11000) {
            console.log('❌ Duplicate key error:', err.message);
            return res.redirect('/become-artisan?error=duplicate_entry');
        }
        
        return res.redirect('/become-artisan?error=creation_failed');
    }
};