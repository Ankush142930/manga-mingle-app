import express from 'express';
import { signup, login, logout } from '../controllers/auth.controller.js';

const router = express.Router();

//Signup Route
router.post('/signup', signup);

//Login Route
router.post('/login', login);

//Logout Route
router.post('/logout', logout);

export default router;
