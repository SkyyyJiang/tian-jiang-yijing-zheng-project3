const express = require("express");
const StatusUpdate = require("../models/StatusUpdate");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { content, user } = req.body;

    if (!content) {
      return res.status(400).send("Content is required");
    }

    const statusUpdate = await StatusUpdate.create({ content, user });

    res.status(201).json(statusUpdate);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

router.get("/", async (req, res) => {
  try {
    const statusUpdates = await StatusUpdate.find().populate(
      "user",
      "username"
    );
    res.status(200).json(statusUpdates);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

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
