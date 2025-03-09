const pool = require("../Config/db");

const LogModel = {
  getAllLogs: async () => {
    const result = await pool.query(
      "SELECT * FROM history_logs ORDER BY created_at DESC"
    );
    return result.rows;
  },

  addLog: async (message) => {
    await pool.query("INSERT INTO history_logs (message) VALUES ($1)", [
      message,
    ]);
  },
};

module.exports = LogModel;
