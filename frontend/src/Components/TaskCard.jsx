import React, { useState, useEffect } from "react";
import { getTags } from "../services/api";
import "./TaskCard.css";

const TaskCard = ({ task }) => {
  const [tag, setTag] = useState(null);

  useEffect(() => {
    fetchTag();
  }, [task.tag_id]);

  const fetchTag = async () => {
    try {
      const tags = await getTags();
      const foundTag = tags.find((t) => t.id === task.tag_id);
      setTag(foundTag || { name: "No Tag", color: "#ccc" });
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  return (
    <div className="task-card">
      <h4>{task.title}</h4>
      <p>{task.description}</p>

      {tag && (
        <span className="tag" style={{ backgroundColor: tag.color }}>
          {tag.name}
        </span>
      )}
    </div>
  );
};

export default TaskCard;
