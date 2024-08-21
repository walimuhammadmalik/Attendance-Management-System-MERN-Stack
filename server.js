const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();

const app = express();
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse application/json
app.use(bodyParser.json());
var vorOptions = {
  origin: "http://localhost:5000",
  optionsSuccessStatus: 200,
};

// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

console.log("server.js");
app.use(cors(vorOptions));
// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

app.get("/example", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// 
// run this command in power shell
// ngrok http http://localhost:5000
