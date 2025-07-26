import jwt from 'jsonwebtoken';
import { Users } from '../Models/Users.js';

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // decode token

    const user = await Users.findById(decoded.id);
    if (!user) return res.redirect('http://localhost:5173/verify-error');

    if (user.isVerified) return res.redirect('http://localhost:5173/verified-already');

    user.isVerified = true;
    await user.save();

    return res.redirect('http://localhost:5173/verify-success');
  } catch (error) {
    console.log('JWT Verify Error:', error.message);
    return res.redirect('http://localhost:5173/verify-error');
  }
};
