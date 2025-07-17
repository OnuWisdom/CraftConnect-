const bcrypt = require('bcrypt');
const user = require('./models/user')

const mongoose = require('mongoose');

async function migratePasswords() {
    try {

        const mongoUrl =  'mongodb+srv://victorajibua14:Oluwashina2004@cluster0.p0twaxf.mongodb.net/craftconnect?retryWrites=true&w=majority&appName=Cluster0'

          await mongoose.connect(mongoUrl);
        // console.log('Connected to MongoDB Atlas');

        const users = await user.find({});
         console.log(`Found ${users.length} users`);

        for (const user of users) {

            const rounds = user.password.split('$')[2].length;

            if (rounds !== '12') {

                 console.log(`User ${user.username} has ${rounds} rounds, updating to 12`);


            // Reset to a default password with 12 rounds
                const newHash = await bcrypt.hash('password123', 12);
                await User.findByIdAndUpdate(user._id, { password: newHash });
                console.log(`✅ Updated ${user.username} - new password: password123`);
            } else {
                console.log(`✅ User ${user.username} already has 12 rounds`);
            }
        }
        
        console.log('Migration complete!');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migratePasswords();
