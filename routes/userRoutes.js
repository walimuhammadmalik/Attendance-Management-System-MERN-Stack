// routes/userRoutes.js
const express = require('express');
const { getUserProfile, updateUserProfile, markAttendance, requestLeave } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Get user profile
router.get('/profile', protect, getUserProfile);

// Update user profile
router.put('/profile', protect, updateUserProfile);

// Mark attendance
router.post('/attendance', protect, markAttendance);

// Request leave
router.post('/leave', protect, requestLeave);

module.exports = router;
