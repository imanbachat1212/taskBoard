const express = require("express");
const LogModel = require("../models/logModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const logs = await LogModel.getAllLogs();
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
