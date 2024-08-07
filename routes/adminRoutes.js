// routes/adminRoutes.js
const express = require('express');
const { manageStudents, getAttendanceRecords, getLeaveRequests, manageGradingCriteria } = require('../controllers/adminController');
const protect = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Get all students (admin only)
router.get('/students', protect, roleMiddleware('admin'), manageStudents);

// Get all attendance records (admin only)
router.get('/attendance', protect, roleMiddleware('admin'), getAttendanceRecords);

// Get all leave requests (admin only)
router.get('/leaves', protect, roleMiddleware('admin'), getLeaveRequests);

// Set grading criteria (admin only)
router.post('/grading', protect, roleMiddleware('admin'), manageGradingCriteria);

module.exports = router;
