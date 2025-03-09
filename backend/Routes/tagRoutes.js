const express = require("express");
const TagController = require("../Controller/tagController");
const router = express.Router();

router.get("/", TagController.getTags);
router.post("/", TagController.createTag);

module.exports = router;
