const express = require("express");
const {
  manageStudents,
  getAttendanceRecords,
  getLeaveRequests,
  manageGradingCriteria,
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/students", protect, roleMiddleware("admin"), manageStudents);
router.get(
  "/attendance",
  protect,
  roleMiddleware("admin"),
  getAttendanceRecords
);
router.get("/leaves", protect, roleMiddleware("admin"), getLeaveRequests);
router.post(
  "/grading",
  protect,
  roleMiddleware("admin"),
  manageGradingCriteria
);

module.exports = router;
