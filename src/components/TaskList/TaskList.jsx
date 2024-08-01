import React from "react";
import { TaskItem } from "../";
import "./TaskList.css";

const TaskList = ({ tasks, deleteTask, handleChangeStatus }) => (
  <div className="TaskList">
    <ul>
      {tasks.map((task) => (
        <TaskItem
          handleChangeStatus={handleChangeStatus}
          key={`task-${task.id}`}
          task={task}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  </div>
);

export default TaskList;
