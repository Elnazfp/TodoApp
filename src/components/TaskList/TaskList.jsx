import React from "react";

const TaskList = () => (
  <div className="TaskList">
    <ul>
      <li>
        <input type="checkbox" />
        <h2>Build This App</h2>
        <button>Delete</button>
      </li>
    </ul>
  </div>
);

export default TaskList;
