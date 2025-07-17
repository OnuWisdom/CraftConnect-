
const User = require('../models/user'); // Make sure this is at the top
function isLoggedIn(req, res, next) {
    console.log('🔍 isLoggedIn check:', {
        hasSession: !!req.session,
        hasUser: !!req.session?.user,
        userRole: req.session?.user?.role
    });
    
    if (req.session && req.session.user) {
        return next();
    }
    
    console.log('❌ Not logged in, redirecting to /auth/sign-up');
    return res.redirect('/auth/sign-up');
}

function isArtisan(req, res, next) {
    console.log('🔍 isArtisan check:', {
        hasSession: !!req.session,
        hasUser: !!req.session?.user,
        userRole: req.session?.user?.role,
        isArtisan: req.session?.user?.role === 'artisan'
    });
    
    if (req.session && req.session.user && req.session.user.role === 'artisan') {
        return next();
    }
    
    console.log('❌ Not artisan, redirecting to home');
    return res.redirect('/'); // Redirect to home since no user dashboard
}

// ✅ ADD THIS: isUser function (even though you don't have user dashboard yet)
function isUser(req, res, next) {
    console.log('🔍 isUser check:', {
        hasSession: !!req.session,
        hasUser: !!req.session?.user,
        userRole: req.session?.user?.role,
        isUser: req.session?.user?.role === 'user'
    });
    
    if (req.session && req.session.user && req.session.user.role === 'user') {
        return next();
    }
    
    console.log('❌ Not user, redirecting to home');
    return res.redirect('/user-dashboard'); // Redirect to home
}

// ✅ CRITICAL: Export all functions
module.exports = { isLoggedIn, isArtisan, isUser };
