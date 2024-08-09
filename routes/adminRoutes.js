const express = require("express");
const adminController = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/register", adminController.adminRegister); //done
router.post("/login", adminController.adminLogin); //done

router.get(
  "/students",
  protect,
  roleMiddleware("admin"),
  adminController.manageStudents
); //done
router.get(
  "/attendance",
  protect,
  roleMiddleware("admin"),
  adminController.getAttendanceRecords
); //done
router.get(
  "/leaves",
  protect,
  roleMiddleware("admin"),
  adminController.getLeaveRequests
); //done
router.post(
  "/grading",
  protect,
  roleMiddleware("admin"),
  adminController.manageGradingCriteria
);
router.get(
  "/students/:email",
  protect,
  roleMiddleware("admin"),
  adminController.getStudentByEmail
); //done
router.post(
  "/students",
  protect,
  roleMiddleware("admin"),
  adminController.postStudent
); //done
router.put(
  "/students/:email",
  protect,
  roleMiddleware("admin"),
  adminController.updateStudentByEmail
); //done
router.delete(
  "/students/:email",
  protect,
  roleMiddleware("admin"),
  adminController.deleteStudentByEmail
); //done
router.get(
  "/getAttendanceRecord",
  protect,
  roleMiddleware("admin"),
  adminController.getAttendanceRecord
); //done

router.get(
  "/getAttendanceRecordByEmail/:email",
  protect,
  roleMiddleware("admin"),
  adminController.getAttendanceRecordByEmail
); //done
router.post(
  "/postAttendanceRecord/:email",
  protect,
  roleMiddleware("admin"),
  adminController.postAttendanceRecord
); //done

router.put(
  "/updateAttendanceRecordByEmail/:email",
  protect,
  roleMiddleware("admin"),
  adminController.updateAttendanceRecordByEmail
); //done
router.delete(
  "/deleteAttendanceRecordByEmail/:email",
  protect,
  roleMiddleware("admin"),
  adminController.deleteAttendanceRecordByEmail
); //done
router.get(
  "/getLeaveRequest",
  protect,
  roleMiddleware("admin"),
  adminController.getLeaveRequest
);
router.put(
  "/approveOrRejectLeaveRequest/:email",
  protect,
  roleMiddleware("admin"),
  adminController.approveOrRejectLeaveRequest
); //done

router.get(
  "/grading",
  protect,
  roleMiddleware("admin"),
  adminController.getGradingCriteria
); //done
router.get(
  "/Grading/:email",
  protect,
  roleMiddleware("admin"),
  adminController.getGradingCriteriaByEmail
);
router.post(
  "/Grading/:email",
  protect,
  roleMiddleware("admin"),
  adminController.postGradingCriteria
); //done
router.put(
  "/Grading/:email",
  protect,
  roleMiddleware("admin"),
  adminController.updateGradingCriteriaByEmail
); // little bit case remaining
router.delete(
  "/Grading/:email",
  protect,
  roleMiddleware("admin"),
  adminController.deleteGradingCriteriaByEmail
);

module.exports = router;
