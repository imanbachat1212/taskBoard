import React, { useEffect, useState } from "react";
import { getTags, createTag } from "../services/api";
import CreateTagModal from "./CreateTagModal";
import "./TagSelector.css";

const TagSelector = ({ selectedTag, onSelectTag }) => {
  const [tags, setTags] = useState([]);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const data = await getTags();
      setTags(data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleTagChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "create_new_tag") {
      setIsTagModalOpen(true); // Open modal
    } else {
      onSelectTag(selectedValue);
    }
  };

  const handleNewTagCreated = async (newTagName, newTagColor) => {
    try {
      const newTag = await createTag({ name: newTagName, color: newTagColor });

      setTags([...tags, newTag]);
      onSelectTag(newTag.id);

      setIsTagModalOpen(false);
    } catch (error) {
      console.error("Error creating tag:", error);
    }
  };

  return (
    <div className="tag-selector">
      <label>Select a Tag:</label>
      <select value={selectedTag} onChange={handleTagChange}>
        <option value="">None</option>
        {tags.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
        <option value="create_new_tag">➕ Create a new Tag</option>
      </select>

      <CreateTagModal
        isOpen={isTagModalOpen}
        closeModal={() => setIsTagModalOpen(false)}
        onTagCreated={handleNewTagCreated}
      />
    </div>
  );
};

export default TagSelector;
