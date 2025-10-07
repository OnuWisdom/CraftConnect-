const User = require('../models/user');
const bcrypt = require('bcryptjs');

// REGISTER
const registerUser = async (req, res) => {
    try {
        // Extract fields from request body
        const { fullname, username, email, password, role } = req.body;

        console.log('🔍 Registration data received:', {
            fullname, username, email, role,
            hasPassword: !!password
        });

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            req.flash('error', 'User with this email already exists');
            return res.status(400).redirect('/auth/register');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user data
        const userData = {
            fullname,
            username,
            email,
            password: hashedPassword,
            role: role || 'user' // Use selected role or default to 'user'
        };

        console.log('🔍 User data to save:', userData);

        // Create and save user
        const user = new User(userData);
        await user.save();

        console.log('✅ User saved:', user._id);

        // 🔧 FIX: Create a plain object for session storage
        const sessionData = {
            _id: user._id.toString(), // Convert ObjectId to string
            fullname: user.fullname,
            username: user.username,
            email: user.email.toLowerCase(),
            role: user.role
        };

        // Set session with plain object
        req.session.user = sessionData;
        
        console.log('🔐 Session set:', sessionData);

        // 🔧 CRITICAL: Save session before redirect
        req.session.save((err) => {
            if (err) {
                console.error('❌ Session save error:', err);
                req.flash('error', 'Registration successful but login failed. Please sign in.');
                return res.redirect('/auth/sign-in');
            }
            
            console.log('✅ Session saved successfully');
            console.log('🔍 Session data after save:', req.session.user);
            req.flash('welcome', `Welcome, ${username}!`);

            // Redirect based on role
            if (role === 'artisan') {
                console.log('🔍 Redirecting to artisan dashboard');
                return res.redirect('/dashboard/artisan');
            } else {
                console.log('🔍 Redirecting to user dashboard');
                return res.redirect('/user-dashboard');
            }
        });

    } catch (error) {
        console.error('❌ Registration error:', error);
        req.flash('error', 'Registration failed. Please try again.');
        return res.status(500).redirect('/auth/register');
    }
};

// FIXED LOGIN - Add debugging to see what's happening
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log('🔍 LOGIN START:', { email, password });

        const user = await User.findOne({
            $or: [{ email: email }, { username: email }]
        });

        if (!user) {
            console.log('❌ USER NOT FOUND');
            alert('Invalid credentials');
            return res.status(400).render('login', {
                error: 'Invalid credentials',
                title: 'Login - CraftConnect',
                currentPage: 'login'
            });
        }

        console.log('✅ USER FOUND:', {
            userId: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
            hasPassword: !!user.password,
        });

const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
   console.log('❌ PASSWORD MISMATCH');
}

console.log('✅ PASSWORD MATCH - Continuing with login');
        
        // Set session
        // req.session.user = user;
        req.session.user = {
         _id: user._id,
         email: user.email,
        username: user.username,
        role: user.role
    };

        // 🔍 ENHANCED SESSION DEBUG
        console.log('🔍 SESSION AFTER SETTING:', {
            sessionId: req.session.id,
            sessionUser: req.session.user,
            sessionUserRole: req.session.user?.role,
            sessionUserEmail: req.session.user?.email,
            sessionKeys: Object.keys(req.session)
        });

        // 🔍 SAVE SESSION EXPLICITLY (this might be the issue)
        req.session.save((err) => {
            if (err) {
                console.error('❌ SESSION SAVE ERROR:', err);
                return res.status(500).render('login', {
                    error: 'Session error. Try again.',
                    title: 'Login - CraftConnect',
                    currentPage: 'login'
                });
            }

            console.log('✅ SESSION SAVED SUCCESSFULLY');

            // Now redirect after session is saved
            if (user.role === 'artisan') {
                console.log('🎨 Redirecting artisan to dashboard');
                return res.redirect('/dashboard/artisan');
            } else {
                console.log('👤 Redirecting user to home');
                return res.redirect('/user-dashboard');
            }
        });

    } catch (err) {
        console.error('❌ LOGIN ERROR:', err);
        return res.status(500).render('login', {
            error: 'Server error. Try again.',
            title: 'Login - CraftConnect',
            currentPage: 'login'
        });
    }
};


module.exports = {
    registerUser,
    loginUser,
};

