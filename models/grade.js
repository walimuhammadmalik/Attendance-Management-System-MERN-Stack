//model/grade.js
const mongoose = require("mongoose");

const gradeSchema = mongoose.Schema({
  attendancePercentage: { type: Number, required: true },
  grade: { type: String, required: true, enum: ["A", "B", "C", "D", "F"] },
});

const Grade = mongoose.model("Grade", gradeSchema);

module.exports = Grade;
