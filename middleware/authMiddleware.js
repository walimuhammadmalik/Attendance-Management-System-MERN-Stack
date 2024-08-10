//middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // let token;
  console.log("protect:", req.headers.authorization);
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7, authHeader.length) // Remove 'Bearer ' prefix
    : authHeader;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = { protect, generateToken };
