import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    //Check for presence of JWT token & return appropriate response if token is not present
    if (!token) {
      res.status(401).json({ error: 'Unauthorized - No Token Provided' });
    }

    //Decode the JWT token using the secret key
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    //If unauthorized then throw error
    if (!decoded) {
      res.status(401).json({ error: 'Unauthorized - Invalid Token' });
    }

    //Find the user
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      res.status(404).json({ error: 'User Not Found!' });
    }

    req.user = user;

    //now move on to the next middleware
    next();
  } catch (error) {
    console.log('Error in protectRoute middleware: ', error.message);
    res.status(500).json({ error: 'Internal Server error' });
  }
};

export default protectRoute;
