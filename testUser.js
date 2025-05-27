require('dotenv').config();

const mongoose = require('mongoose');
const User = require('./models/user');

async function run() {

 try{

    await
    mongoose.connect(process.env.Mongo_URL);

    console.log('Connected to MONGODB');

    const newUser = new User({

        fullname: 'VictorAJAHss',
        username:  'ACE',
        email: 'ace@example.com',
        password: 'securepassword',
        confirmPassword: 'securepassword',
        useUsername: 'true',

    });

    const savedUser = await newUser.save();
    console.log('User Saved:', savedUser);

    mongoose.disconnect();
 }catch(err){

    console.error('Error', err);
 }
   
}
run();




