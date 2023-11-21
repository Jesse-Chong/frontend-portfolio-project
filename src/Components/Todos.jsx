import { useState, useEffect } from "react";
import Todo from "./Todo";

const API = import.meta.env.VITE_API_URL;

console.log(API);
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

  return (
    <div className="Todos">
      <section>
        <div>
          <label htmlFor="categoryFilter">Filter by Category: </label>
          <select
            id="categoryFilter"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="all">All</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Is it complete?</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Todos;