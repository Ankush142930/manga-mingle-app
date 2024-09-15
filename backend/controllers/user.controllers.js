import User from '../models/user.model.js';

export const getUsersForSidebar = async (req, res) => {
  try {
    //get the currently logged in user's id from the request object
    const loggedInUserId = req.user._id;

    //filter the users list by excluding the currently logged in user and removing passwords
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select('-password');

    //finally return response as an array of users
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log('Error in getUsersForSidebar: ', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
