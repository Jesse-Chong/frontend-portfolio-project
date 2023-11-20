import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { capitalizeDescription, capitalizeTitle } from "./helper";

const API = import.meta.env.VITE_API_URL;

function TodoDetails() {
  const [todo, setTodo] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  let navigate = useNavigate();
  let { id } = useParams();
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API}/todo/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }
      alert("todo entry deleted successfully");
      navigate("/todos");
    } catch (error) {
      console.error("Error deleting todo entry:", error.message);
    }
  };

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch(`${API}/todo/${id}`);
        const data = await response.json();
        
        // Date ensures that the data will be coverted to a date and if not show invalid date
        if (response.ok) {
            const capitalizedTodo = {
                ...data,
                todo_date: new Date(data.todo_date).toISOString().split('T')[0],
              };
              setTodo(capitalizedTodo);
        } else {
          console.error(`Error in API response (${response.status}):`, data);
        }
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    };
  
    fetchTodo();
  }, [id]);

  return (
    <>
      {todo && (
        <>
          <p>Title: {todo.todo_title}</p>
          <p>Description: {todo.todo_description}</p>
          <p>Date: {todo.todo_date}</p>
          <div>
            <Button variant="danger" onClick={handleShowDeleteModal}>
              Delete
            </Button>
            <Button variant="warning" onClick={() => navigate("/todos")}>
              Back
            </Button>
            <button
              className="info"
              onClick={() => navigate(`/todos/${id}/edit`)}
            >
              Edit
            </button>
          </div>
        </>
      )}
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
    </>
  );
}

export default TodoDetails;
