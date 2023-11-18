import { Link } from "react-router-dom";
import { capitalizeTitle, capitalizeDescription } from "./helper";

function Todo({ todo }) {
  const { id, todo_title, todo_description, todo_date, todo_istrue } = todo;
  console.log(id, todo_title, todo_description, todo_date, todo_istrue);

  return (
    <tr>
      <td>
        <Link to={`/todos/${id}`}>{capitalizeTitle(todo_title)}</Link>
      </td>
      <td>{capitalizeDescription(todo_description)}</td>
      {/* <td>{todo_date}</td> */}
    </tr>
  );
}

export default Todo;
