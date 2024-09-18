/////////////////////////////////////////////////Imports/////////////////////////////////////////
//Package Imports
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//Route Imports
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import { app, server } from './socket/socket.js';

//Database Imports
import connectToMongoDB from './db/connectToMongoDB.js';

/////////////////////////////////////////////////Configuring/////////////////////////////////////////
dotenv.config();

/////////////////////////////////////////////////Variables/////////////////////////////////////////
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

/////////////////////////////////////////////////Middlewares/////////////////////////////////////////

//1.) to parse the incoming requests with JSON payloads(from req.body)
app.use(express.json());

//2.) to parse the cookie in the header
app.use(cookieParser());

//3.) Authorization routes
app.use('/api/auth', authRoutes);

//4.) Message routes
app.use('/api/messages', messageRoutes);

//5.) User routes
app.use('/api/users', userRoutes);

//6.) static middleware that express gives us to serve static files such as html, css, javascript, image files, sound files that we have in our frontend application
app.use(express.static(path.join(__dirname, '/frontend/dist')));

//7.) Other than mentioned routes handling
app.get;
'*',
  (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  };
/////////////////////////////////////////Initializing the server/////////////////////////////////////
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is listening on port: ${PORT}`);
});
