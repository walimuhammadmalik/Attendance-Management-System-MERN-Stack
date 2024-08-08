const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  markAttendance,
  requestLeave,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/attendance", protect, markAttendance);
router.post("/leave", protect, requestLeave);

module.exports = router;
