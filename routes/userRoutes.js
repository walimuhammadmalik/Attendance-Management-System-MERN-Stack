const express = require("express");
const userController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, userController.getUserProfile); //done
router.put("/profile", protect, userController.updateUserProfile); //done
router.post("/attendance", protect, userController.markAttendance); //done
router.post("/leave", protect, userController.requestLeave); //done
router.get("/attendance", protect, userController.getAttendanceReport); //done
router.get("/leave", protect, userController.getLeaveRequest); //done
router.delete("/profile", protect, userController.deleteUserProfile); //done
router.get("/grade", protect, userController.getGrade); //done
router.post("/grade", protect, userController.testGrade); //done
router.get("/users/:_id", userController.getUserById); //done

module.exports = router;
