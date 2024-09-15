import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';

//SIGNUP CONTROLLER
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    //Hashing the password(with Salting)
    //1.) first we generate the salt
    const salt = await bcrypt.genSalt(10);

    //2.) Now we generate the hashed password using the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    //Default profile pic placeholders [https://avatar-placeholder.iran.liara.run/document]
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    //Creating a new user
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === 'Male' ? boyProfilePic : girlProfilePic,
    });

    //Saving the newly created user to the database
    //Giving back the appropriate response
    if (newUser) {
      //Generate JWT
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: 'Invalid User data' });
    }
  } catch (error) {
    console.log('Error in SignUp Controller: ', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//LOGIN CONTROLLER
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    //Finding the user in the database
    const user = await User.findOne({ username });

    //Checking if the password retrieved from the body is correct or not
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ''
    );

    //If user does not exist then throw an error
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid Credentials!🚫' });
    }

    //Generate the token and set cookie
    generateTokenAndSetCookie(user._id, res);

    //send the final response
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log('Error in Login Controller: ', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//LOGOUT CONTROLLER
export const logout = (req, res) => {
  try {
    //removing the token from the cookie
    res.cookie('jwt', '', { maxAge: 0 });

    //sending the final response
    res.status(200).json({ message: 'Logged out Successfully!' });
  } catch (error) {
    console.log('Error in Logout Controller: ', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
