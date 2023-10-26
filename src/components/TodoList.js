import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const TodoList = ({ todos, handleDelete, handleEdit }) => {
  const [completedTasks, setCompletedTasks] = useState([]);

  const toggleTaskCompletion = (taskId) => {
    if (completedTasks.includes(taskId)) {
      setCompletedTasks(completedTasks.filter((id) => id !== taskId));
    } else {
      setCompletedTasks([...completedTasks, taskId]);
    }
  };

  return (
    <ul className="allTodos">
      {todos.map((t) => (
        <li className={`singleTodo ${completedTasks.includes(t._id) ? 'completed' : ''}`} key={t._id}>
          <input
            type="checkbox"
            checked={completedTasks.includes(t._id)}
            onChange={() => toggleTaskCompletion(t._id)}
          />
          <span className="todoText">{t.todo}</span>
          {!completedTasks.includes(t._id) && ( // Render the Edit button only for incomplete tasks
            <button onClick={() => handleEdit(t._id)} className="bn3637 bn37">
              <FontAwesomeIcon icon={faPen} />
            </button>
          )}
          <button onClick={() => handleDelete(t._id)} className="bn3637 bn37">
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
