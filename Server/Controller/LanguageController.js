import Language from "../Models/Language.js";

// ✅ Add Language
export const LanguageAdd = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.length < 2) {
      return res
        .status(400)
        .json({ message: "Language is required and must be at least 2 characters." });
    }

    const existingLanguage = await Language.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });

    if (existingLanguage) {
      return res.status(400).json({ message: "This language is already added." });
    }

    const newLanguage = new Language({ name });
    await newLanguage.save();

    res.status(201).json({
      message: "Language added successfully",
      language: newLanguage,
    });
  } catch (error) {
    console.error("LanguageAdd Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Languages
export const LanguageGet = async (req, res) => {
  try {
    const languages = await Language.find().sort({ createdAt: -1 });
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete Language
export const LanguageDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLang = await Language.findByIdAndDelete(id);
    if (!deletedLang) {
      return res.status(404).json({ message: "Language not found" });
    }
    res.status(200).json({ message: "Language deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update Language
export const LanguageUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.length < 2) {
      return res.status(400).json({ message: "Language must be at least 2 characters." });
    }

    const updatedLang = await Language.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedLang) {
      return res.status(404).json({ message: "Language not found" });
    }

    res.status(200).json({
      message: "Language updated successfully",
      language: updatedLang,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
