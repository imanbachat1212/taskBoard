const pool = require("./Config/db");

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        color VARCHAR(20)
      );

      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        status VARCHAR(50), -- Changed "column" to "status"
        tag_id INTEGER REFERENCES tags(id) ON DELETE SET NULL,
        position INTEGER
      );

      CREATE TABLE IF NOT EXISTS history_logs (
        id SERIAL PRIMARY KEY,
        message TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log(" Tables created successfully!");
  } catch (error) {
    console.error("Error creating tables:", error);
  } finally {
    pool.end();
  }
};

// Run the function
createTables();
