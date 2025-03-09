import React, { useState } from "react";
import { createTask } from "../services/api";
import TagSelector from "./TagSelector";
import "./AddTaskModal.css";

const AddTaskModal = ({ isOpen, closeModal, refreshTasks, columnName }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) return;

    const newTask = await createTask({
      title,
      description,
      status: columnName,
      tag_id: selectedTag,
      position: 0,
    });

    refreshTasks();
    closeModal();
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {" "}
        <h3>Create a New Task</h3>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <TagSelector selectedTag={selectedTag} onSelectTag={setSelectedTag} />
        <div className="modal-actions">
          <button onClick={handleSubmit}>Create</button>
          <button className="close-btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
