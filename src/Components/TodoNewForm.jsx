import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function TodoNewForm() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState({
    todo_title: "",
    todo_description: "",
    todo_date: "",
    todo_istrue: false,
  });

  const handleTextChange = (event) => {
    setTodo({ ...todo, [event.target.id]: event.target.value });
  };

  const createTodo = () => {
    fetch(`${API}/todo`, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server returned status: ${response.status}`);
        }
        return response.json();
      })
      .then((newTodo) => {
        navigate(`/todos/${newTodo.id}`);
      })
      .catch((error) => console.error("Error creating todo:", error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createTodo();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="title">
          <label htmlFor="todo_title" className="form-label">
            Title:
          </label>
          <input
            id="todo_title"
            value={todo.todo_title}
            type="text"
            className="form-control"
            onChange={handleTextChange}
            placeholder="Title"
            required
          />
        </div>
        <div className="description">
          <label htmlFor="todo_description" className="form-label">
            Description:
          </label>
          <input
            id="todo_description"
            type="text"
            value={todo.todo_description}
            className="form-control"
            placeholder="Description"
            onChange={handleTextChange}
            required
          />
        </div>
        <div className="date">
          <label htmlFor="todo_date" className="form-label">
            Date:
          </label>
          <input
            id="todo_date"
            type="date"
            value={todo.todo_date}
            className="form-control"
            placeholder="Date"
            onChange={handleTextChange}
            required
          />
        </div>
        <div className="category">
          <label htmlFor="todo_category">Category:</label>
          <select
            id="todo_category"
            value={todo.todo_category}
            onChange={(e) =>
              setTodo({ ...todo, todo_category: e.target.value })
            }
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">
          Save
        </button>
      </form>
      <Link to={`/todos/${id}`}>
        <button className="btn btn-secondary mt-2">Cancel</button>
      </Link>
    </>
  );
}

export default TodoNewForm;
