const Entry = require("../models/entryModel"); // Adjust the path if needed

// Get all entries with user info (name + email)
const getAllEntries = async (req, res) => {
  try {
    const entries = await Entry.find()
      .populate("createdBy", "name email") // 🟢 Populate user details
      .sort({ createdAt: -1 }); // optional: latest first

    res.status(200).json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ message: "Failed to fetch entries" });
  }
};

module.exports = {
  getAllEntries,
};
