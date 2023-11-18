import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <h1>
        <Link to="/todos">Todo's</Link>
      </h1>
      <button>
        <Link to="/todos/new">New Todo</Link>
      </button>
    </nav>
  );
}
