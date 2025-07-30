import mongoose from "mongoose";

const skillGigSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // the user who created this gig
      required: true,
    },
    teachSkills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
        required: true,
      },
    ],
    learnSkills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
        required: true,
      },
    ],
    languages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language",
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default  mongoose.model("SkillGig", skillGigSchema);


