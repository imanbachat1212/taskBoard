const pool = require("../Config/db");

const TaskModel = {
  getAllTasks: async () => {
    const result = await pool.query(
      "SELECT * FROM tasks ORDER BY position ASC"
    );
    return result.rows;
  },

  createTask: async (title, description, status, tag_id, position) => {
    const result = await pool.query(
      "INSERT INTO tasks (title, description, status, tag_id, position) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, status, tag_id, position]
    );
    return result.rows[0];
  },

  updateTask: async (id, status, position) => {
    const result = await pool.query(
      "UPDATE tasks SET status = $1, position = $2 WHERE id = $3 RETURNING *",
      [status, position, id]
    );
    return result.rows[0];
  },

  deleteTask: async (id) => {
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    return { message: "Task deleted successfully" };
  },
};

module.exports = TaskModel;
