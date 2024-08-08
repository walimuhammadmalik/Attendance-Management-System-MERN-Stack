const express = require("express");
const userController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, userController.getUserProfile);
router.put("/profile", protect, userController.updateUserProfile);
router.post("/attendance", protect, userController.markAttendance);
router.post("/leave", protect, userController.requestLeave);
router.get("/attendance", protect, userController.getAttendanceReport);
router.get("/leave", protect, userController.getLeaveRequest);
router.delete("/profile", protect, userController.deleteUserProfile);
router.get("/grade", protect, userController.getGrade);

module.exports = router;
