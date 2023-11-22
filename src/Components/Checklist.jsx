import { useState } from "react";
import ChecklistForm from "./ChecklistForm";
import { capitalizeDescription } from "./helper";
import { Button, Modal, Card } from "react-bootstrap";

const API = import.meta.env.VITE_API_URL;

function Checklist({
  checklist,
  id,
  handleDelete,
  handleSubmit,
  setChecklists
}) {
  const [viewEditForm, setEditForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingChecklistId, setDeletingChecklistId] = useState(null);

  const toggleView = () => {
    setEditForm(!viewEditForm);
  };

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);

    // Only set the checklist status back to ❌ if it was true before showing the modal
    if (deletingChecklistId !== null) {
      setChecklists((prevChecklists) =>
        prevChecklists.map((checklist) =>
          checklist.id === deletingChecklistId
            ? { ...checklist, checklist_istrue: false }
            : checklist
        )
      );
    }

    setDeletingChecklistId(null);
  };

  const handleUpdateStatusChecklist = async (checklistId) => {
    try {
      const response = await fetch(
        `${API}/todo/${id}/checklist/${checklistId}/completion`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        const updatedChecklist = await response.json();

        if (updatedChecklist.checklist_istrue) {
          setShowDeleteModal(true);
          setDeletingChecklistId(checklistId);
        }

        setChecklists((prevChecklists) =>
          prevChecklists.map((checklist) =>
            checklist.id === updatedChecklist.id ? updatedChecklist : checklist
          )
        );
      } else {
        console.error("Error updating completion status:", response.status);
      }
    } catch (error) {
      console.error("Error updating completion status:", error);
    }
  };

  return (
    <div>
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
        Checklists
      </h1>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ marginBottom: "10px" }}
      >
        <Card className="border-5">
          <Card.Body className="text-center p-3">
            <div className="Checklist">
              {viewEditForm ? (
                <ChecklistForm
                  checklistDetails={{ ...checklist, id: checklist.id }}
                  toggleView={toggleView}
                  handleSubmit={handleSubmit}
                />
              ) : (
                <div>
                  <h4>
                    {checklist.checklist_title}{" "}
                    <span>
                      {capitalizeDescription(checklist.checklist_description)}
                    </span>
                  </h4>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleUpdateStatusChecklist(checklist.id)}
                  >
                    Done: {checklist.checklist_istrue ? "✅" : "❌"}
                  </Button>
                  {!viewEditForm && (
                    <div className="checklist-actions">
                      <Button variant="warning" onClick={toggleView}>
                        {viewEditForm ? "Cancel" : "Edit this checklist"}
                      </Button>
                      <Button variant="danger" onClick={handleShowDeleteModal}>
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this checklist?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-warning" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => handleDelete(checklist.id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Checklist;