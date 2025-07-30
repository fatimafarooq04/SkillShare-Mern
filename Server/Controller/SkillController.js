import Skills from "../Models/Skills.js";

export const SkillAdd = async (req, res) => {
  try {
    const { skill } = req.body;

    if (!skill || skill.length < 2) {
      return res
        .status(400)
        .json({ message: "Skill is required and must be at least 2 characters." });
    }

    // Check if skill already exists (case-insensitive)
    const existingSkill = await Skills.findOne({
      skill: { $regex: new RegExp(`^${skill}$`, "i") },
    });

    if (existingSkill) {
      return res
        .status(400)
        .json({ message: "This skill is already added." });
    }

    const newSkill = new Skills({ skill });
    await newSkill.save();

    res.status(201).json({
      message: "Skill added successfully",
      skill: newSkill,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
//  Get All Skills
export const SkillGet = async (req, res) => {
  try {
    const skills = await Skills.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// ✅ Delete Skill
export const SkillDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSkill = await Skills.findByIdAndDelete(id);
    if (!deletedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update Skill
export const SkillUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { skill } = req.body;

    if (!skill || skill.length < 2) {
      return res.status(400).json({ message: "Skill must be at least 2 characters." });
    }

    const updatedSkill = await Skills.findByIdAndUpdate(
      id,
      { skill },
      { new: true }
    );

    if (!updatedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.status(200).json({ message: "Skill updated successfully", skill: updatedSkill });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
