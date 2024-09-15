import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getUsersForSidebar } from '../controllers/user.controllers.js';

const router = express.Router();

//Get users for sidebar route
router.get('/', protectRoute, getUsersForSidebar);

export default router;
