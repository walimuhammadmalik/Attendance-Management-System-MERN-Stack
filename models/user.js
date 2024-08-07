//model/user.js
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["admin", "student"],
    default: "student",
  },
  attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendance" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// const mongoose = require("mongoose");
// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = require("../config/db").sequelize;

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, default: "user" },
// });

// const User = mongoose.model("User", userSchema);

// const UserAttendance = sequelize.define("UserAttendance", {
//   userId: { type: DataTypes.INTEGER, allowNull: false },
//   date: { type: DataTypes.DATEONLY, allowNull: false },
//   status: { type: DataTypes.STRING, allowNull: false },
// });

// module.exports = { User, UserAttendance };
