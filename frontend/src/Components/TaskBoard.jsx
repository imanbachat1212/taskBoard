import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getTasks, updateTask } from "../services/api";
import TaskCard from "./TaskCard";
import AddTaskModal from "./AddTaskModal";
import { useNavigate } from "react-router-dom";
import "./TaskBoard.css";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");
  const navigate = useNavigate();

  const columns = ["Backlog", "To Do", "Done"];

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedTasks = [...tasks];

    const [movedTask] = updatedTasks.splice(source.index, 1);
    movedTask.status = columns[destination.droppableId];

    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);

    await updateTask(movedTask.id, {
      status: movedTask.status,
      position: destination.index,
    });
  };

  return (
    <div className="task-board-container">
      <h1 className="title">Homepage</h1>
      <button className="history-logs-btn" onClick={() => navigate("/logs")}>
        History Logs
      </button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="task-board">
          {columns.map((column, index) => (
            <Droppable key={index} droppableId={index.toString()}>
              {(provided) => (
                <div
                  className="column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3 className="column-title">{column}</h3>
                  <div className="task-list">
                    {tasks
                      .filter((task) => task.status === column)
                      .map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="task-card"
                            >
                              <TaskCard task={task} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}{" "}
                  </div>
                  <button
                    className="create-card-btn"
                    onClick={() => {
                      setSelectedColumn(column);
                      setIsModalOpen(true);
                    }}
                  >
                    Create a card
                  </button>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <AddTaskModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        refreshTasks={fetchTasks}
        columnName={selectedColumn}
      />
    </div>
  );
};

export default TaskBoard;
