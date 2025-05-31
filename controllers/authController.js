// const User = require('../models/user');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');


// // Fixed: Changed from exports.register to registerUser
// const registerUser = async (req, res) => {
//     try {
//         const { fullname, username, email, password } = req.body;

//         // Fixed: Changed salt rounds from 20 to 10 (20 is too high and slow)
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const user = new User({
//             fullname,
//             username,
//             email,
//             password: hashedPassword,
//         });

//         await user.save();

//         res.status(201).json({ 
//             message: 'User Registered Successfully!'
//         });

//     } catch (err) {
//         res.status(500).json({
//             error: err.message
//         });
//     }
// };

// // Fixed: Moved outside the register function and renamed to loginUser
// const loginUser = async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(400).json({ error: 'User not found' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ error: 'Invalid Credentials' });
//         }

//         const token = jwt.sign(
//             { id: user._id, username: user.username },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );

//         return res.json({ message: 'Login Successful!', token });

//     } catch (err) {
//         return res.status(500).json({ error: err.message });
//     }
// };



// // Fixed: Export functions with the correct names that match your routes
// module.exports = {
//     registerUser,
//     loginUser,
// };










const User = require('../models/user');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { fullname, username, email, password, confirmPassword } = req.body;
        
        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const user = new User({
            fullname,
            username,
            email,
            password // Will be hashed by the pre('save') middleware
        });

        await user.save();

      res.redirect('/home')

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};



const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        
          
        

            const user = await User.findOne({ 
            $or: [
                { email: email },
                { username: email } // In case user enters username in email field
            ]
        });

        if (!user) {
            return res.render('login', { 
                error: 'User not found',
                title: 'Login - CraftConnect',
                currentPage: 'login'
            });
        }

         

        // Use the comparePassword method from the User model
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.redirect('/home')
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
};