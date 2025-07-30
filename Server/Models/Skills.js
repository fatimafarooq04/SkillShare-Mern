import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Skill', skillSchema);
