import "./App.css";
import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      const editTodo = todos.find((i) => i._id === editId);
      try {
        const response = await axios.put(`http://localhost:3001/api/tasks/${editId}`, { todo });
        console.log("Todo updated on the server. Response:", response.data);
  
        // Update the state to reflect the edited task
        const updatedTodos = todos.map((t) =>
          t._id === editTodo._id
            ? { ...editTodo, todo } // Keep the original _id
            : t
        );
  
        setTodos(updatedTodos);
        setTodo("");
        setEditId(0);
      } catch (error) {
        console.error("Error updating todo on the server:", error);
      }
    } else {
      if (todo !== "") {
        try {
          const response = await axios.post("http://localhost:3001/api/tasks/", { todo });
          console.log("Todo added on the server. Response:", response.data);
          // After successful addition, you can add the new todo to the state if needed.
          setTodos([...todos, response.data]);
          setTodo("");
        } catch (error) {
          console.error("Error adding todo on the server:", error);
        }
      }
    }
  };
  const handleDelete = async (id) => {
      if (!id) {
      console.error("Invalid task ID");
      return;
      }
    
    try {
      const response = await axios.delete(`http://localhost:3001/api/tasks/${id}`);
      if (response.status === 204) {
        const updatedTodos = todos.filter((todo) => todo._id !== id);
        console.log("Delete successfull");
        setTodos(updatedTodos);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  
  

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i._id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };
  return (
    <div className="App">
      <div className="container">
        <h1><FontAwesomeIcon icon={faBars} />&nbsp; All Tasks</h1>
        <TodoForm
         handleSubmit={handleSubmit}
         todo={todo}
         editId={editId}
         setTodo={setTodo} />
        <TodoList  todos={todos}
          handleEdit={handleEdit}
          handleDelete={handleDelete}/>
      </div>
    </div>
  );
};

export default App;
