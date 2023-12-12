const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).send("User already exists");
    }

    user = new User({
      username,
      password,
      isLoggedIn: false,
    });

    await user.save();

    res.status(201).send("User registered successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send("Invalid credentials1");
    }

    if (user.password !== password) {
      return res.status(401).send("Invalid credentials2");
    }

    user.isLoggedIn = true;
    await user.save();

    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.json({
      message: "Login successful",
      user: { username: user.username, isLoggedIn: user.isLoggedIn },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/logout", async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.isLoggedIn = false;
    await user.save();

    res.send("User logged out successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
