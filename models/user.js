//model/user.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    set: (value) => {
      return bcrypt.hashSync(value);
    },
  },
  role: {
    type: String,
    required: true,
  },
  profilePic: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// grade: { type: mongoose.Schema.Types.ObjectId, ref: "Grade" },
//   leaveRequests: [
//     { type: mongoose.Schema.Types.ObjectId, ref: "LeaveRequest" },
//   ],
//   attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendance" }],
