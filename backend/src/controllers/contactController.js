const Contact = require("../models/Contact");

const contactController = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    return res.status(201).json({ message: "Contact form submitted successfully!" });
  } catch (err) {
    console.error("Error saving contact:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { contactController };
