import { useState, useEffect } from "react";
import Todo from "./Todo";

const API = import.meta.env.VITE_API_URL;

console.log(API);
function Todos() {
  const [todos, setTodos] = useState([]);

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

  return (
    <div className="Todos">
      <section>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>checkbox</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return <Todo key={todo.id} todo={todo} />
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Todos;