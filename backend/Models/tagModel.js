const pool = require("../Config/db");

const TagModel = {
  getAllTags: async () => {
    const result = await pool.query("SELECT * FROM tags");
    return result.rows;
  },

  createTag: async (name, color) => {
    const result = await pool.query(
      "INSERT INTO tags (name, color) VALUES ($1, $2) RETURNING *",
      [name, color]
    );
    return result.rows[0];
  },
};

module.exports = TagModel;
