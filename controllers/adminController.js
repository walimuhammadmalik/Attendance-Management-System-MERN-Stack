// controllers/adminController.js
const User = require("../models/user");
const Attendance = require("../models/attendance");
const LeaveRequest = require("../models/leaveRequest");
const Grade = require("../models/grade");

// Get all students
const manageStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all attendance records
const getAttendanceRecords = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find().populate(
      "userId",
      "name email"
    );
    res.json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all leave requests
const getLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find().populate(
      "userId",
      "name email"
    );
    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Manage grading criteria
const manageGradingCriteria = async (req, res) => {
  const { attendancePercentage, grade } = req.body;
  try {
    const newGrade = new Grade({ attendancePercentage, grade });
    const savedGrade = await newGrade.save();
    res.status(201).json(savedGrade);
  } catch (error) {
    res.status(400).json({ message: "Bad request" });
  }
};

module.exports = {
  manageStudents,
  getAttendanceRecords,
  getLeaveRequests,
  manageGradingCriteria,
};
