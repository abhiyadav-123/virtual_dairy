const express = require("express");
const router = express.Router();
const User = require("../models/userModel"); // adjust path if needed

// GET all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// DELETE user
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});


// UPDATE user
router.put("/users/:id", async (req, res) => {
  try {
    const { firstName, lastName, role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, role },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

module.exports = router;
