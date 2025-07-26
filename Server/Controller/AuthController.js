// signup with jwt-based verification
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { Users } from '../Models/Users.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const newUser = new Users({
      name,
      email,
      password, // ⚠️ In production, hash the password
      isVerified: false,
    });

    await newUser.save();

    // JWT token for email verification
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    const verificationUrl = `http://localhost:5000/api/auth/verify/${token}`;

    await transporter.sendMail({
      from: `"SkillStitch" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify your email',
      html: `
        <h3>Hello ${name},</h3>
        <p>Click the link below to verify your email:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
      `,
    });

    res.status(200).json({ message: 'Signup successful, please verify your email.' });
  } catch (error) {
    console.error('Signup Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};




// Login Route
export const login=async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // only send over HTTPS in production
      sameSite: 'Lax', // or 'Strict'
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/', // apply to whole site

    });

    // Optional: send user details
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }

};