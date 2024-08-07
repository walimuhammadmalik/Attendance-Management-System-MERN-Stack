const User = require("../models/user");
const Attendance = require("../models/attendance");
const LeaveRequest = require("../models/leaveRequest");

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Mark attendance
const markAttendance = async (req, res) => {
  const { date } = req.body;
  try {
    // Check if attendance already marked for today
    const existingAttendance = await Attendance.findOne({
      userId: req.user._id,
      date,
    });
    if (existingAttendance) {
      return res
        .status(400)
        .json({ message: "Attendance already marked for today" });
    }

    const attendance = new Attendance({
      userId: req.user._id,
      date,
    });

    const markedAttendance = await attendance.save();
    res.status(201).json(markedAttendance);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Request leave
const requestLeave = async (req, res) => {
  const { startDate, endDate, reason } = req.body;
  try {
    const leaveRequest = new LeaveRequest({
      userId: req.user._id,
      startDate,
      endDate,
      reason,
    });

    const request = await leaveRequest.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  markAttendance,
  requestLeave,
};
