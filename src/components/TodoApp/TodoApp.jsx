import React, { useEffect, useState } from "react";
import { AddTaskForm, TaskList, FilterFooter } from "../";
import "./TodoApp.css";
import { v4 as uuidv4 } from "uuid";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [filterTasks, setFilterTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    // setTasks([
    //   {
    //     id: uuidv4(),
    //     title: "Default Task",
    //     status: true,
    //   },
    //   {
    //     id: uuidv4(),
    //     title: "Default Task Number 2",
    //     status: false,
    //   },
    // ]);

    let storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      storedTasks = JSON.parse(storedTasks);
    } else {
      storedTasks = [];
    }
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilterTasks(tasks);
    }
    if (filter === "completed") {
      const newCompletedFilterTasks = tasks.filter((task) => task.status);
      setFilterTasks(newCompletedFilterTasks);
    }
    if (filter === "active") {
      const newActiveFilterTasks = tasks.filter((task) => !task.status);
      setFilterTasks(newActiveFilterTasks);
    }
  }, [filter, tasks, refresh]);

  const addTask = (taskTitle) => {
    const newTask = [
      ...tasks,
      {
        id: uuidv4(),
        title: taskTitle,
        status: false,
      },
    ];
    setTasks(newTask);
    localStorage.setItem("tasks", JSON.stringify(newTask));
  };

  const deleteTask = (taskId) => {
    let newTasksList = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasksList);
    localStorage.setItem("tasks", JSON.stringify(newTasksList));
  };

  const handleChangeStatus = (taskId) => {
    let newTasksList = tasks;
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    newTasksList[taskIndex].status = !newTasksList[taskIndex].status;
    setTasks(newTasksList);
    localStorage.setItem("tasks", JSON.stringify(newTasksList));
    setRefresh(refresh + 1);
  };

  return (
    <div className="TodoApp">
      <AddTaskForm addTask={addTask} />
      <TaskList
        tasks={filterTasks}
        deleteTask={deleteTask}
        handleChangeStatus={handleChangeStatus}
      />
      <FilterFooter updateFilter={setFilter} tasks={filterTasks} />
    </div>
  );
};

export default TodoApp;
