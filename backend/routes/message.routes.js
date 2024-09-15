import express from 'express';
import { sendMessage, getMessages } from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

//Get messages between two users Route
router.get('/:id', protectRoute, getMessages);

//Send message Route
router.post('/send/:id', protectRoute, sendMessage);

export default router;
