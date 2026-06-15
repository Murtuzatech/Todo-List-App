import { FaCheckCircle, FaTrashAlt } from "react-icons/fa"; // React icons install kar lena

export default function TodoList({ task, index, onDelete, onToggleCheck }) {
  return (
    <li className="todo-item">
      <span className={task.checked ? "checkList" : "notCheckList"}>
        {task.text}
      </span>

      <button 
        className="check-btn" 
        onClick={() => onToggleCheck(index)}
      >
        <FaCheckCircle 
          color={task.checked ? "#4caf50" : "#ccc"} 
          size={22} 
        />
      </button>

      <button 
        className="delete-btn" 
        onClick={() => onDelete(index)}
      >
        <FaTrashAlt 
          color="#e74c3c" 
          size={20} 
        />
      </button>
    </li>
  );
}