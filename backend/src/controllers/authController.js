const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const generateToken = require("../utils/generateToken");

// ✅ Signup Controller
const signup = async (req, res) => {
  try {
    let { email } = req.body;
    email = email?.trim().toLowerCase();
    const { firstName, lastName, password } = req.body;

    if (!email || !firstName || !password) {
      return res.status(400).json({ message: "Fill all required fields!" });
    }

    if (!validator.isEmail(email)) {
      return res.status(422).json({ message: "Invalid email format!" });
    }

    if (email.length > 50) {
      return res
        .status(422)
        .json({ message: "Email cannot exceed 50 characters!" });
    }

    if (firstName.length > 50) {
      return res
        .status(422)
        .json({ message: "First name cannot exceed 50 characters!" });
    }

    if (lastName && lastName.length > 50) {
      return res
        .status(422)
        .json({ message: "Last name cannot exceed 50 characters!" });
    }

    if (password.length > 100) {
      return res
        .status(422)
        .json({ message: "Password cannot exceed 100 characters!" });
    }

    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return res.status(422).json({ message: "Please enter strong password!" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(422).json({ message: "User already exist!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      role: "general", // default role
    });

    generateToken(user._id, res);

    res.status(201).json({
      message: "Signed up successfully and logged you in!",
      data: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      message: "Something went wrong! Please try again later!",
    });
  }
};

// ✅ Login Controller
const login = async (req, res) => {
  try {
    let { email } = req.body;
    email = email?.trim().toLowerCase();
    const { password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    generateToken(user._id, res);

    res.json({
      message: "User logged in successfully!",
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({
      message: "Something went wrong! Please try again later!",
    });
  }
};

// ✅ Logout Controller
const logout = (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "Lax",
    secure: false, // change to true in production with HTTPS
  });
  res.status(200).json({ message: "Logout successfully!" });
};

// ✅ Change Password Controller
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Both old and new passwords are required!" });
    }

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const passwordCompare = await bcrypt.compare(oldPassword, user.password);
    if (!passwordCompare) {
      return res.status(401).json({ message: "Old Password is incorrect!" });
    }

    if (await bcrypt.compare(newPassword, user.password)) {
      return res.status(422).json({ message: "New password must differ!" });
    }

    if (
      !validator.isStrongPassword(newPassword, {
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return res.status(422).json({ message: "Please enter strong password!" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password changed successfully!" });
  } catch (error) {
    console.error("Error updating password!: ", error);
    res.status(500).json({
      message: "Something went wrong! Please try again later!",
    });
  }
};

module.exports = { signup, login, logout, changePassword };
