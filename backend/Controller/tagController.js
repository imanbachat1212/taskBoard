const TagModel = require("../models/tagModel");

const TagController = {
  getTags: async (req, res) => {
    try {
      const tags = await TagModel.getAllTags();
      res.json(tags);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  createTag: async (req, res) => {
    try {
      const { name, color } = req.body;
      if (!name || !color) {
        return res.status(400).json({ error: "Name and color are required" });
      }
      const newTag = await TagModel.createTag(name, color);
      res.json(newTag);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = TagController;
