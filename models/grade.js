//model/grade.js
const mongoose = require("mongoose");

const gradeSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  attendancePercentage: { type: Number, required: true },
  grade: {
    type: String,
    required: true,
    enum: ["A", "B", "C", "D", "F"],
    default: "NILL",
  },
});

const Grade = mongoose.model("Grade", gradeSchema);

module.exports = Grade;
