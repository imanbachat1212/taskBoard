const express = require("express");
const TaskController = require("../Controller/taskController");

const router = express.Router();

router.get("/", TaskController.getTasks);
router.post("/", TaskController.createTask);
router.patch("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);

module.exports = router;
