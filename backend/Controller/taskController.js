const TaskModel = require("../models/taskModel");
const LogModel = require("../models/logModel");

const TaskController = {
  getTasks: async (req, res) => {
    try {
      const tasks = await TaskModel.getAllTasks();
      res.json(tasks);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  createTask: async (req, res) => {
    try {
      const { title, description, status, tag_id, position } = req.body;
      const newTask = await TaskModel.createTask(
        title,
        description,
        status,
        tag_id,
        position
      );
      await LogModel.addLog(`"${title}" was added to "${status}"`);
      res.json(newTask);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  updateTask: async (req, res) => {
    try {
      const { status, position } = req.body;
      const { id } = req.params;
      const updatedTask = await TaskModel.updateTask(id, status, position);
      await LogModel.addLog(`"${updatedTask.title}" was moved to "${status}"`);
      res.json(updatedTask);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await TaskModel.deleteTask(id);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = TaskController;
