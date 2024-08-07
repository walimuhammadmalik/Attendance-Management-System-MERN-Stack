// model/attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
