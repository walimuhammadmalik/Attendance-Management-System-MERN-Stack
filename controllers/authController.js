//controller/authController.js
// const jwt = require("jsonwebtoken");
const { generateToken } = require("../middleware/authMiddleware");
const User = require("../models/user");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

// Register a new user
const registerUser = async (req, res) => {
  // console.log("Reg", req.body);
  // console.log(req.body);
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    // : hashedPassword
    const user = new User({
      name,
      email,
      password,
      role,
    });

    await user.save();
    const token = generateToken(user._id);
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });
    console.log("User registered", user);
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error hai" });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    // const isMatch = password === user.password;

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    console.log("User login", user);
    const token = generateToken(user._id);
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const testUser = async (req, res) => {
  const obj = req.body;
  console.log("Test");
  console.log(obj);
  res.status(405).json(obj);
};

// get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser, testUser, getUsers };
