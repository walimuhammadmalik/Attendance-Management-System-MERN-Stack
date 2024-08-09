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
  console.log("update user profile: ", req.body);
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
  console.log("delete user profile: ", req.user);
  // console.log("User found :", user);
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    const user = await User.findById(req.user._id);
    await user.deleteOne();
    res.json({ message: "User removed" });
  } catch (error) {
    console.log("delete error: ", error);
    res.status(500).json({ message: "delete Server error" });
  }
};

// Mark attendance
const markAttendance = async (req, res) => {
  console.log("mark attendance: ", req.user);
  const date = new Date().toLocaleDateString();
  console.log("date: ", date);
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
      status: "present",
    });

    const markedAttendance = await attendance.save();
    res.status(201).json(markedAttendance);
  } catch (error) {
    console.log("mark attendance error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};
//attendance report
const getAttendanceReport = async (req, res) => {
  console.log("get attendance report: ", req.user);
  // console.log("date: ", Date());
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
  console.log("request leave: ", req.body);
  console.log("request leave: ", req.user);
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
    console.log("request leave error: ", error);
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
  console.log("get grade: ", req.user);
  try {
    const grade = await Grade.find({ userId: req.user._id });
    res.json(grade);
  } catch (error) {
    console.log("get grade error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};
// test grade
const testGrade = async (req, res) => {
  console.log("test grade: ", req.user);
  const { attendancePercentage, grade } = req.body;
  try {
    const grades = new Grade({
      userId: req.user._id,
      attendancePercentage: attendancePercentage,
      grade: grade,
    });
    const newGrade = await grades.save();
    res.json(newGrade);
  } catch (error) {
    console.log("test grade error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// get user by id
const getUserById = async (req, res) => {
  // console.log("get user by id: ");
  // console.log("get user by id: ", req.params._id);
  try {
    const user = await User.findById(req.params._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log("get user by id error: ", error);
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
  testGrade,
  getUserById,
};
