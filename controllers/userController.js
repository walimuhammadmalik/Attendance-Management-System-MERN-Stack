const User = require("../models/user");
const Attendance = require("../models/attendance");
const LeaveRequest = require("../models/leaveRequest");
const Grade = require("../models/grade");

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
  const obj = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = obj.name || user.name;
    user.email = obj.email || user.email;
    user.profilePic = req.file
      ? req.file.path
      : user.profilePic || obj.profilePic;
    password = req.body.password || user.password;
    await user.save();
    console.log("User updated :", user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
//delete user profile
const deleteUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.remove();
    res.json({ message: "User removed" });
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
//attendance report
const getAttendanceReport = async (req, res) => {
  try {
    const attendance = await Attendance.find({ userId: req.user._id });
    res.json(attendance);
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
// get leave request
const getLeaveRequest = async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.find({ userId: req.user._id });

    res.json(leaveRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// get grade
const getGrade = async (req, res) => {
  try {
    const grade = await Grade.find();
    res.json(grade);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  markAttendance,
  requestLeave,
  getAttendanceReport,
  getLeaveRequest,
  deleteUserProfile,
  getGrade,
};
