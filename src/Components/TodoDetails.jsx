import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Modal, Card } from "react-bootstrap";
import { capitalizeDescription, capitalizeTitle } from "./helper";
import Checklists from "./Checklists";

const API = import.meta.env.VITE_API_URL;

function TodoDetails() {
  const [todo, setTodo] = useState([]);
  const [checklists, setChecklists] = useState([]);
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
      setShowDeleteModal(false);
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
            todo_title: capitalizeTitle(data.todo_title),
            todo_description: capitalizeDescription(data.todo_description),
            todo_date: new Date(data.todo_date).toISOString().split("T")[0]
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
      <h1
        className="text-center"
        style={{
          background: "black",
          color: "white",
          padding: "10px",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto"
        }}
      >
        Full Details
      </h1>
      <div className="d-flex justify-content-center align-items-center h-100">
        <Card className="border-5">
          <Card.Body className="text-center p-3">
            {todo && (
              <>
                <h3>Title: {todo.todo_title}</h3>
                <h5>Description: {todo.todo_description}</h5>
                <h6>Date: {todo.todo_date}</h6>
                <div>
                  <Button variant="danger" onClick={handleShowDeleteModal}>
                    Delete
                  </Button>
                  <Button variant="warning" onClick={() => navigate("/todos")}>
                    Back
                  </Button>
                  <Button
                    variant="info"
                    onClick={() => navigate(`/todos/${id}/edit`)}
                  >
                    Edit
                  </Button>
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      </div>
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
      <Checklists checklists={checklists} setChecklists={setChecklists} />
    </>
  );
}

export default TodoDetails;
