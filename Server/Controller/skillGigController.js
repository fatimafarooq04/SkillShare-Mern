import skillGig from "../Models/skillGig.js";

export const createSkillGig = async (req, res) => {
  try {
    const { teachSkills, learnSkills, languages } = req.body;

    if (!teachSkills?.length || !learnSkills?.length || !languages?.length) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newGig = new skillGig({
      teachSkills, // already array of IDs
      learnSkills,
      languages,
    });

    await newGig.save();
    res.status(201).json({ message: "Skill Gig created successfully!", gig: newGig });
  } catch (error) {
    console.error("Error creating skill gig:", error);
    res.status(500).json({ message: "Server error while creating skill gig" });
  }
};

