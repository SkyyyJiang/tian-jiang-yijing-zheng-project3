const express = require("express");
const StatusUpdate = require("../models/StatusUpdate");
const router = express.Router();
const { isUserVerified } = require("./helper.js");

router.post("/", async (req, res) => {
  try {
    const { username, content } = req.body;

    if (!isUserVerified(req, username)) {
      return res.status(401).send("User is not authorized")
    }

    if (!content) {
      return res.status(400).send("Content is required");
    }

    const statusUpdate = await StatusUpdate.create(req.body);

    res.status(201).json(statusUpdate);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

router.get("/", async (req, res) => {
  try {
    const statusUpdates = await StatusUpdate.find().sort({ createdAt: -1 })
    res.status(200).json(statusUpdates);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const statusUpdates = await StatusUpdate.find({ user: userId })
      .populate("user", "username")
      .select("content createdAt");

    const formattedUpdates = statusUpdates.map((update) => ({
      username: update.user.username,
      content: update.content,
      createdAt: update.createdAt,
    }));

    res.status(200).json(formattedUpdates);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

/**
 * update post by post id
 */
router.put("/:id", async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params;

    const statusUpdate = await StatusUpdate.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    if (!statusUpdate) {
      return res.status(404).send("Status Update not found");
    }

    res.status(200).json(statusUpdate);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const statusUpdate = await StatusUpdate.findByIdAndDelete(id);

    if (!statusUpdate) {
      return res.status(404).send("Status Update not found");
    }

    res.status(200).send("Status Update deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
