// controllers/adminController.js
const User = require("../models/user");
const Attendance = require("../models/attendance");
const LeaveRequest = require("../models/leaveRequest");
const Grade = require("../models/grade");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/authMiddleware");

//adminRegister
const adminRegister = async (req, res) => {
  console.log("a Reg", req.body);
  // console.log(req.body);
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({
      name,
      email,
      password,
      role: "admin",
    });

    await user.save();
    const token = generateToken(user._id);
    console.log("User registered", user);
    res.status(201).json({ token, user });
  } catch (error) {
    console.log("Admin register err: ", error);
    res.status(500).json({ message: "Server error hai" });
  }
};
// adminLogin
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    console.log("User login", user);
    const token = generateToken(user._id);
    res.json({ token, user });
  } catch (error) {
    console.log("Admin login err: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

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
    console.log("Get attendance records error: ", error);
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
    console.log("Get leave requests error: ", error);
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
    console.log("Manage grading criteria error: ", error);
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
    console.log("Get attendance record error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};
// get a student by email
const getAttendanceRecordByEmail = async (req, res) => {
  try {
    const id = await User.findOne({ email: req.params.email });
    const attendance = await Attendance.find({ userId: id._id });
    res.json(attendance);
  } catch (error) {
    console.log("Get attendance record by email error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// post a student
const postAttendanceRecord = async (req, res) => {
  try {
    const obj = await User.findOne({ email: req.params.email });
    const attendance = await Attendance.create({
      userId: obj._id,
      ...req.body,
    });
    res.json(attendance);
  } catch (error) {
    console.log("Post attendance record error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// update a student by email
const updateAttendanceRecordByEmail = async (req, res) => {
  try {
    const obj = await User.findOne({ email: req.params.email });
    const attendance = await Attendance.findOneAndUpdate(
      { userId: obj._id, date: req.body.date },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(attendance);
  } catch (error) {
    console.log("Update attendance record by email error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// delete a student by email, only selected date
const deleteAttendanceRecordByEmail = async (req, res) => {
  try {
    const obj = await User.findOne({ email: req.params.email });
    const attendance = await Attendance.findOneAndDelete({
      userId: obj._id,
      date: req.body.date,
    });
    res.json(attendance);
  } catch (error) {
    console.log("Delete attendance record by email error: ", error);
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
    console.log("Get leave request error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

//approve a leave request
const approveOrRejectLeaveRequest = async (req, res) => {
  try {
    const obj = await User.findOne({ email: req.params.email });
    const leave = await LeaveRequest.findOneAndUpdate(
      { userId: obj._id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    return res.json(leave);
  } catch (error) {
    console.log("Approve leave request error: ", error);
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
    console.log("Get grading criteria error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// get a grading criteria by grade student email
const getGradingCriteriaByEmail = async (req, res) => {
  try {
    const obj = await User.findOne({ email: req.params.email });
    const grade = await Grade.find({ userId: obj._id });
    res.json(grade);
  } catch (error) {
    console.log("Get grading criteria by email error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// post a grading criteria
const postGradingCriteria = async (req, res) => {
  try {
    const obj = await User.findOne({ email: req.params.email });
    const grade = await Grade.create({ userId: obj._id, ...req.body });
    res.json(grade);
  } catch (error) {
    console.log("Post grading criteria error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};
// update a grading criteria by grade student email
const updateGradingCriteriaByEmail = async (req, res) => {
  try {
    const obj = await User.findOne({ email: req.params.email });
    const grade = await Grade.findOneAndUpdate(
      { userId: obj._id, attendancePercentage: req.body.attendancePercentage },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(grade);
  } catch (error) {
    console.log("Update grading criteria by email error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// delete a grading criteria by grade student email
const deleteGradingCriteriaByEmail = async (req, res) => {
  try {
    const obj = await User.findOne({ email: req.params.email });
    const grade = await Grade.findOneAndDelete({
      userId: obj._id,
      attendancePercentage: req.body.attendancePercentage,
      grade: req.body.grade,
    });
    res.json(grade);
  } catch (error) {
    console.log("Delete grading criteria by email error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  adminRegister,
  adminLogin,
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
  approveOrRejectLeaveRequest,
  getGradingCriteria,
  getGradingCriteriaByEmail,
  postGradingCriteria,
  updateGradingCriteriaByEmail,
  deleteGradingCriteriaByEmail,
};
