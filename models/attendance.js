// model/attendance.js
const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["present", "absent", "leave"],
  },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
