import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function TodoEditForm() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState({
    todo_title: "",
    todo_description: "",
    todo_date: "",
    todo_istrue: false
  });

  const handleTextChange = (event) => {
    setTodo({ ...todo, [event.target.id]: event.target.value });
  };

  // Update a todo. Redirect to show view
  const updateTodo = () => {
    fetch(`${API}/todo/${id}`, {
      method: "PUT",
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
      .then(() => {
        navigate(`/todos/${id}`);
      })
      .catch((error) => console.error("Error creating todo:", error));
  };

  // On page load, fill in the form with the todo data
  useEffect(() => {
    fetch(`${API}/todo/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        setTodo(responseJSON);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateTodo();
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

export default TodoEditForm;