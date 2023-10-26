import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';

const TodoForm = ({ handleSubmit, todo, editId, setTodo }) => {
  return (
    <form className="todoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={todo}
        id="todo"
        name="todo"
        onChange={(e) => setTodo(e.target.value)}
      />
      <button type="submit" className="bn3637 bn37"> {editId ? <FontAwesomeIcon icon={faPen} />
 : <FontAwesomeIcon icon={faPlus} />
}</button>
    </form>
  );
};

export default TodoForm;