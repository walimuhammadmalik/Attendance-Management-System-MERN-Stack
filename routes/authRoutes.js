const express = require("express");
const {
  registerUser,
  loginUser,
  testUser,
  getUsers,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser); //done
router.post("/login", loginUser); //done
router.post("/testUser", testUser); //done
router.get("/getUsers", getUsers); //done

module.exports = router;
