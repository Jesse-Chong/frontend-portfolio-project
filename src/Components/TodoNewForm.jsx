import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { capitalizeDescription } from "./helper";

const API = import.meta.env.VITE_API_URL;

function TodoNewForm() {
  const navigate = useNavigate();
  const [todo, setTodo] = useState({
    todo_title: "",
    todo_description: "",
    todo_date: "",
    todo_istrue: false,
    todo_category: "personal"
  });

  const handleTextChange = (event) => {
    setTodo({ ...todo, [event.target.id]: event.target.value });
  };

  const createTodo = () => {
    const capitalizedDescription = capitalizeDescription(todo.todo_description);
    fetch(`${API}/todo`, {
      method: "POST",
      body: JSON.stringify({ ...todo, todo_description: capitalizedDescription }),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.id) {
          throw new Error("Invalid response from server");
        }
        navigate(`/todos/${data.id}`);
      })
      .catch((error) => console.error("Error creating todo:", error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createTodo();
  };

  return (
    <>
          <h1
        className="text-center"
        style={{     background: "black",
        color: "white",
        padding: "10px",
        width: "100%", 
        maxWidth: "600px",
        margin: "0 auto" }}
      >
        New
      </h1>
    <div className="d-flex justify-content-center align-items-center">
      <div className="Edit">
        <Card className="border-5">
          <Card.Body>
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
        < br/>
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
        <br />
        <button type="submit" className="btn btn-success">
          Save
        </button>
      </form>
      <Link to={`/todos`}>
        <button className="btn btn-secondary mt-2">Cancel</button>
      </Link>
      </Card.Body>
        </Card>
        </div>
        </div>
    </>
  );
}

export default TodoNewForm;