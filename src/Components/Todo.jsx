import { Link } from "react-router-dom";

function Todo({ todo }) {
  const { id, todo_title, todo_description, todo_date, todo_istrue } = todo;
  console.log(id, todo_title, todo_description, todo_date, todo_istrue);

  return (
    <tr>
      <td>
        <Link to={`/todos/${id}`}>{todo_title}</Link>
      </td>
      <td>{todo_description}</td>
      <td>{todo_date}</td>
    </tr>
  );
}

export default Todo;
