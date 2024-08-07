//controller/userController.js
const User = require("../models/user");
const Attendance = require("../models/attendance");
const LeaveRequest = require("../models/leaveRequest");

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const markAttendance = async (req, res) => {
  const attendanceExists = await Attendance.findOne({
    userId: req.user._id,
    date: new Date().toISOString().split("T")[0],
  });

  if (attendanceExists) {
    return res
      .status(400)
      .json({ message: "Attendance already marked for today" });
  }
};

const attendance = new Attendance({
  userId: req.user._id,
  date: new Date(),
  status: "Present",
});

const markedAttendance = await attendance.save();
