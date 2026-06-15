import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [dateTime, setDateTime] = useState("");

  // Real-time Date and Time running effect
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString();
      setDateTime(`${formattedDate} - ${formattedTime}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Add new task
  const handleAddTask = (inputValue) => {
    if (!inputValue.trim()) return;

    // Duplicate check
    if (tasks.some((task) => task.text === inputValue)) return;

    setTasks([...tasks, { text: inputValue, checked: false }]);
  };

  // Delete specific task
  const handleDeleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter(
      (_, index) => index !== indexToDelete
    );
    setTasks(updatedTasks);
  };

  // Toggle complete/checked status
  const handleToggleCheck = (indexToToggle) => {
    const updatedTasks = tasks.map((task, index) =>
      index === indexToToggle
        ? { ...task, checked: !task.checked }
        : task
    );

    setTasks(updatedTasks);
  };

  // Clear all tasks
  const handleClearAll = () => {
    setTasks([]);
  };

  return (
    <section className="todo-container">
      <header>
        <h1>Todo List</h1>
        <h2 className="date-time">{dateTime}</h2>
      </header>

      {/* Form Component */}
      <TodoForm onAddTask={handleAddTask} />

      {/* Tasks List */}
      <section className="myUnOrdList">
        <ul>
          {tasks.map((task, index) => (
            <TodoList
              key={index}
              index={index}
              task={task}
              onDelete={handleDeleteTask}
              onToggleCheck={handleToggleCheck}
            />
          ))}
        </ul>
      </section>

      {/* Clear All Button */}
      {tasks.length > 0 && (
        <button className="clear-btn" onClick={handleClearAll}>
          Clear All
        </button>
      )}
    </section>
  );
}