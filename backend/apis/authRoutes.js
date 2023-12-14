const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const { isUserVerified } = require("./helper.js");

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
    });

    await user.save();
    const token = jwt.sign(username, process.env.JWT_SECRET);
    res.cookie("username", token);

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
      return res.status(401).send("Username not exist");
    }
    if (user.password !== password) {
      return res.status(401).send("Invalid password");
    }
    const token = jwt.sign(username, process.env.JWT_SECRET);
    res.cookie("username", token);
    return res.send("Login successful");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/logout", async (req, res) => {
  res.cookie('username', '', { maxAge: 0, });
  res.send(true);
});


/**
 * return username
 * if user is logged in, return the actual username, else return null
 */
router.get("/isLoggedIn", async function(req, res) {

  const username = req.cookies.username;

  if (!username) {
    return res.send({ username: null });
  }
  let decryptedUsername;
  try {
    decryptedUsername = jwt.verify(username, process.env.JWT_SECRET);
  } catch (e) {
    return res.send({ username: null });
  }

  if (!decryptedUsername) {
    return res.send({ username: null });
  } else {
    return res.send({ username: decryptedUsername });
  }

})

router.get("/:username", async function(req, res) {
  const { username } = req.params;
  console.log(username);
  const user = await User.findOne({ username });
  return res.send(user);
})

router.put("/editProfile", async function(req, res) {
  const { username, description } = req.body;
  if (!isUserVerified(req, username)) {
    return res.status(401).send("User is not authorized")
  }
  try {
    const user = await User.findOneAndUpdate(username, {description: description}, {new: true});
    if (!user) {
      return res.status(401).send("Username not exist");
    } 
    return res.send("Updated successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).send(err)
  }
});

module.exports = router;
