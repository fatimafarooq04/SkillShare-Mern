import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },

  // Manual login only
  password: { type: String },

  // 'manual', 'google', or 'facebook'
  provider: { type: String, default: 'manual' },

  // Email verification
  isVerified: { type: Boolean, default: false }, // For manual only
  verificationToken: { type: String }, // Random token for email verification

  // Social logins may use this for profile pictures or IDs
  googleId: { type: String },
  facebookId: { type: String },

  createdAt: { type: Date, default: Date.now },
});

// 🔐 Hash password before saving (only if password exists/modified)
userSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

export const Users = mongoose.model('Users', userSchema);
