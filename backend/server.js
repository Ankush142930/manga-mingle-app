/////////////////////////////////////////////////Imports/////////////////////////////////////////
//Package Imports
import express from 'express';
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

/////////////////////////////////////////Initializing the server/////////////////////////////////////
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is listening on port: ${PORT}`);
});
