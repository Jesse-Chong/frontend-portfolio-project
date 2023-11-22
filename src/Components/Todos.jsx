import { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import { capitalizeDescription } from "./helper";
import Todo from "./Todo";

const API = import.meta.env.VITE_API_URL;

function Todos() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch(`${API}/todo`)
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        setTodos(responseJSON);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredTodos(todos);
    } else {
      const filtered = todos.filter((todo) => todo.todo_category === filter);
      setFilteredTodos(filtered);
    }
  }, [todos, filter]);

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <Container>
      <h1
        className="text-center"
        style={{ background: "black", color: "white", padding: "10px" }}
      >
        Full Details
      </h1>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ marginBottom: "10px" }}
      >
        <section>
          <div
            style={{
              background: "white",
              textAlign: "center",
              padding: "10px",
            }}
          >
            <label htmlFor="categoryFilter" style={{ marginRight: "10px" }}>
              Filter by Category:{" "}
            </label>
            <select
              id="categoryFilter"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              style={{ padding: "5px" }}
            >
              <option value="all">All</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
            </select>
          </div>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Is it complete?</th>
              </tr>
            </thead>
            <tbody>
              {filteredTodos.map((todo) => (
                <Todo
                  key={todo.id}
                  todo={{
                    ...todo,
                    todo_description: capitalizeDescription(
                      todo.todo_description
                    ),
                  }}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </tbody>
          </Table>
        </section>
      </div>
    </Container>
  );
}

export default Todos;