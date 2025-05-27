const User = require('../models/user')


const getUserProfile = async (req, res) => {

  try {

    const user = await User.findById(req.params.id).select('-password'); 

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);

  } catch (err) {

    res.status(500).json({ message: err.message });
    
  }

}

const getAllUsers = async (_req, res) => {

  try {
    const users = await User.find().select('-password');  // exclude password field

    res.status(200).json(users);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }
}
const uploadUserPhoto = async (req, res) => {
  try {
    const userId = req.params.id;
    const photo = req.file?.filename;

    if (!photo) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { photo },
      { new: true }
    );

    res.status(200).json({
      message: 'Photo uploaded successfully',
      user: updatedUser
    });
  } catch (err) {
    res.status(500).json({
      message: err.message 
    });
  }
}


module.exports = {
  getUserProfile,
  getAllUsers,
  uploadUserPhoto, 
};

