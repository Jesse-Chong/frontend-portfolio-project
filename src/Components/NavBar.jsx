import { Navbar as BootstrapNavbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  if (isHomePage) {
    return null;
  }

  const linkStyle = {
    color: "white",
    padding: "10px",
    textDecoration: "none",
  };

  return (
    <BootstrapNavbar
      className="d-flex justify-content-between align-items-center"
      bg="dark"
      variant="dark"
    >
      <Nav>
        <Link to="/todos" style={linkStyle}>
          Todos
        </Link>
      </Nav>
      <BootstrapNavbar.Brand
        className="text-center"
        style={{ fontSize: "20px", color: "white" }}
      >
        Oh Crap! Wheres my Priorities?
      </BootstrapNavbar.Brand>
      <Nav>
        <Link to="/todos/new" style={linkStyle}>
          New Todo
        </Link>
      </Nav>
    </BootstrapNavbar>
  );
}

export default Navbar;