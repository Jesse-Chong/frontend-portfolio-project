import { Link } from "react-router-dom";
import { useState } from "react";
import { capitalizeTitle, capitalizeDescription } from "./helper";
import { Button, Modal } from "react-bootstrap";

const API = import.meta.env.VITE_API_URL;

const linkStyle = {
    textDecoration: 'none',
    color: 'purple'
  };

function Todo({ todo, onDelete }) {
  const {
    id,
    todo_title,
    todo_description,
    todo_istrue
  } = todo;
  const [completionStatus, setCompletionStatus] = useState(todo_istrue);
  const [initialCompletionStatus, setInitialCompletionStatus] = useState(todo_istrue);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleToggleCompletion = async () => {
    try {
      const response = await fetch(`${API}/todo/${id}/completion`, {
        method: "PUT",
        body: JSON.stringify({ is_true: !completionStatus }),
        headers: {
          "Content-Type": "application/json"
        },
      });
      if (response.ok) {
        setCompletionStatus((prevCompletionStatus) => !prevCompletionStatus);

        if (!completionStatus) {
          setShowDeleteModal(true);
          setInitialCompletionStatus(completionStatus);
        }
      }
    } catch (error) {
      console.error("Error updating todo entry:", error);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setCompletionStatus(initialCompletionStatus);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API}/todo/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }
      alert("todo entry deleted successfully");
      onDelete(id)
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting todo entry:", error.message);
    }
  };


  return (
    <tr>
      <td>
        <Link to={`/todos/${id}`} style={linkStyle} >{capitalizeTitle(todo_title)}</Link>
      </td>
      <td>{capitalizeDescription(todo_description)}</td>
      <td>
        <button onClick={handleToggleCompletion}>
          {completionStatus ? "✅" : "❌"}
        </button>
      </td>
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this todo entry?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-warning" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="outline-danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </tr>
  );
}

export default Todo;