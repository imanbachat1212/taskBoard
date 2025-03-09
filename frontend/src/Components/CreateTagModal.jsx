import React, { useState } from "react";
import "./CreateTagModal.css";

const CreateTagModal = ({ isOpen, closeModal, onTagCreated }) => {
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState("#000000");

  const handleCreateTag = () => {
    if (!tagName.trim()) return;
    onTagCreated(tagName, tagColor);
    setTagName("");
    setTagColor("#000000");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Tag</h2>
        <input
          type="text"
          placeholder="Tag Name"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
        />
        <input
          type="color"
          value={tagColor}
          onChange={(e) => setTagColor(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleCreateTag}>Create</button>
          <button className="close-btn" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTagModal;
