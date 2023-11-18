import { Link } from "react-router-dom";
import { useState } from "react";
import { capitalizeTitle, capitalizeDescription } from "./helper";

const API = import.meta.env.VITE_API_URL;

function Todo({ todo }) {
  const { id, todo_title, todo_description, todo_date, todo_istrue } = todo;
  const [completionStatus, setCompletionStatus] = useState(todo_istrue);
  console.log(id, todo_title, todo_description, todo_date, todo_istrue);

  const handleToggleCompletion = async () => {
    try {
      const response = await fetch(`${API}/todo/${id}/completion`, {
        method: "PUT",
        body: JSON.stringify({ is_true: !completionStatus }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setCompletionStatus((prevCompletionStatus) => !prevCompletionStatus);
      }
    } catch (error) {
      console.error("Error updating todo entry:", error);
    }
  };

  return (
    <tr>
      <td>
        <Link to={`/todos/${id}`}>{capitalizeTitle(todo_title)}</Link>
      </td>
      <td>{capitalizeDescription(todo_description)}</td>
      {/* <td>{todo_date}</td> */}
              <button onClick={handleToggleCompletion}>
        {completionStatus ? "✅" : "❌"}
        </button>
    </tr>
  );
}

export default Todo;
