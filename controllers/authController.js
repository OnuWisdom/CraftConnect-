const User = require('../models/user');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, fullname, username, email, password} = req.body;
        
        const existingUser = await User.findOne({ email });
        if( existingUser) {

            return res.status(400).json({

                message:  'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        //create new user

        const User = new User({

            name,
            email,
            password: hashedPassword,
            role: 'user',
            fullname,
            username,
        });

        await user.save();
      req.flash('welcome', `Welcome, ${username}!`)
        console.log('Flash message:', req.flash('welcome'));

        //Generate JWT Token

        const token = jwt.sign(

            {userId: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        );

        res.status(201).json({

              message: 'User registered successfully', token,
            user: {

                id:  user._id,
                name: user.name,
                email: user.email,
                role: user.role
                
            }
        });
        //    res.redirect('/')
    }catch(error){

        res.status(500).json({

            message: error.message
        });
    }
};


// register as artisan 

// const registerArtisan = (req, res) => {

//     try{

//         const { name, email, password, craftType, experience, location,bio, skills} = req.body;

//         const existingUser = await User.findOne({email});
//         if(existingUser){

//             return res.status(400).json({
//                 messsage: 'User already exists'
//             });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const artisan = new User({

//             name,
//             email,
//             password: hashedPassword,
//             role: 'artisan',
//             craftType,
//             experience,
//             location,
//             bio,
//             skills: skills ||  []
//         });

//         await artisan.save();

//         //generate jwt token 

//         const token = jwt.sign(

//             {userId: artisan_id, role: artisan.role},
//             process.env.JWT_SECRET,
//             {expiresIn: '24hr'}
//         );

//         res.status(201).json({

//             message: 'Artisan resgistered successfully', tokem,
//             user: {
//                 id: artisan._id,
//                 name: artisan.name,
//                 email: artisan.email,
//                 role: artisan.role,
//                 craftType: artisan.craftType
//             }
//         });

//     }catch(eerror){

//         res.status(500).json({

//             message: error.message
//         });
//     }
// };



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

         req.flash('welcome', `Welcome back!`)

       w
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
  
};




















    // Check if passwords match
    //     if (password !== confirmPassword) {
    //         return res.status(400).json({ error: 'Passwords do not match' });
    //     }

    //     const user = new User({
    //         fullname,
    //         username,
    //         email,
    //         password // Will be hashed by the pre('save') middleware
    //     });

    //     await user.save();

    //     req.flash('welcome', `Welcome, ${username}!`)
    //     // console.log('Flash message:', req.flash('welcome'));
        

    //   res.redirect('/')

    // } catch (err) {
    //     res.status(500).json({
    //         error: err.message
    //     });