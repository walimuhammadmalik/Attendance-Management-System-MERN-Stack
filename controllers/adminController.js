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

// /admin/students: GET, POST, PUT, DELETE endpoints to manage student records.
// get a user by email
const getStudentByEmail = async (req, res) => {
  try {
    const student = await User.findOne({ email: req.params.email });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// post a user
const postStudent = async (req, res) => {
  try {
    const student = await User.create(req.body);
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// update a user by email
const updateStudentByEmail = async (req, res) => {
  try {
    const student = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// delete a user by email
const deleteStudentByEmail = async (req, res) => {
  try {
    const student = await User.findOneAndDelete({ email: req.params.email });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// /admin/attendance: GET, POST, PUT, DELETE endpoints for managing attendance
// get all students record.
const getAttendanceRecord = async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// get a student by email
const getAttendanceRecordByEmail = async (req, res) => {
  try {
    const attendance = await Attendance.findOne({ email: req.params.email });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// post a student
const postAttendanceRecord = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// update a student by email
const updateAttendanceRecordByEmail = async (req, res) => {
  try {
    const attendance = await Attendance.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// delete a student by email
const deleteAttendanceRecordByEmail = async (req, res) => {
  try {
    const attendance = await Attendance.findOneAndDelete({
      email: req.params.email,
    });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// /admin/leave: GET, PUT endpoints for managing leave requests
// get all leave requests
const getLeaveRequest = async (req, res) => {
  try {
    const leave = await LeaveRequest.find();
    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//approve a leave request
const approveLeaveRequest = async (req, res) => {
  try {
    const leave = await LeaveRequest.findOne;
    return res.json(leave);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// reject a leave request
const rejectLeaveRequest = async (req, res) => {
  try {
    const leave = await LeaveRequest.findOne;
    return res.json(leave);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// /admin/grading: GET, POST, PUT, DELETE endpoints for managing grading criteria
// get all grading criteria
const getGradingCriteria = async (req, res) => {
  try {
    const grade = await Grade.find();
    res.json(grade);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// get a grading criteria by grade student email
const getGradingCriteriaByEmail = async (req, res) => {
  try {
    const grade = await Grade.findOne({ email: req.params.email });
    res.json(grade);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// post a grading criteria
const postGradingCriteria = async (req, res) => {
  try {
    const grade = await Grade.create(req.body);
    res.json(grade);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// update a grading criteria by grade student email
const updateGradingCriteriaByEmail = async (req, res) => {
  try {
    const grade = await Grade.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(grade);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// mark a grading criteria using attendance by grade student email
const markGradingCriteriaByEmail = async (req, res) => {
  try {
    const grade = await Grade.findOneAndUpdate(
      { email: req.params.email },
      req
    );
    res.json(grade);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// delete a grading criteria by grade student email
const deleteGradingCriteriaByEmail = async (req, res) => {
  try {
    const grade = await Grade.findOneAndDelete({ email: req.params.email });
    res.json(grade);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  manageStudents,
  getAttendanceRecords,
  getLeaveRequests,
  manageGradingCriteria,
  getStudentByEmail,
  postStudent,
  updateStudentByEmail,
  deleteStudentByEmail,
  getAttendanceRecord,
  getAttendanceRecordByEmail,
  postAttendanceRecord,
  updateAttendanceRecordByEmail,
  deleteAttendanceRecordByEmail,
  getLeaveRequest,
  approveLeaveRequest,
  rejectLeaveRequest,
  getGradingCriteria,
  getGradingCriteriaByEmail,
  postGradingCriteria,
  updateGradingCriteriaByEmail,
  markGradingCriteriaByEmail,
  deleteGradingCriteriaByEmail,
};
