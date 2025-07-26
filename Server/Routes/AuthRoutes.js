import express from 'express';
import {  login, signup } from '../Controller/AuthController.js';
import { verifyEmail } from '../Controller/VerifyEmail.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();


// signup route manual 
// Public Routes

router.post('/signup', signup);
router.post('/login', login);

router.get('/verify/:token', verifyEmail); // URL pattern must match
// Protected Route Example
router.get('/profile', protect, (req, res) => {
  res.json({ message: `Hello User ${req.user.id}` });
});



export default router;
