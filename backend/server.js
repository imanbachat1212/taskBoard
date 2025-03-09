const express = require("express");
const cors = require("cors");
require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");
const tagRoutes = require("./routes/tagRoutes");
const logRoutes = require("./routes/logRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/tasks", taskRoutes);
app.use("/tags", tagRoutes);
app.use("/logs", logRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
