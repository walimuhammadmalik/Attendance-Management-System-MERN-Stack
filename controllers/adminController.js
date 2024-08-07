// controllers/adminController.js
const User = require('../models/user');
const Attendance = require('../models/attendance');
const LeaveRequest = require('../models/leaveRequest');
const Grade = require('../models/grade');

// Get all students
const manageStudents = async (req, res) => {
  try {
    const users = await User.find({ role: 'student' });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all attendance records
const getAttendanceRecords = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();
    res.json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all leave requests
const getLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find();
    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Manage grading criteria
const manageGradingCriteria = async (req, res) => {
  const { attendancePercentage, grade } = req.body;
  try {
    const gradingCriteria = await Grade.create({ attendancePercentage, grade });
    res.status(201).json(gradingCriteria);
  } catch (error) {
    res.status(400).json({ message: 'Bad request' });
  }
};

module.exports = { manageStudents, getAttendanceRecords, getLeaveRequests, manageGradingCriteria };
