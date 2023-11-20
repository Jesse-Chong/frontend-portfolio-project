import { useState } from "react";
import ChecklistForm from "./ChecklistForm";

function Checklist({
  checklist,
  handleDelete,
  handleSubmit,
  handleUpdateStatus,
}) {
  const [viewEditForm, setEditForm] = useState(false);

  const toggleView = () => {
    setEditForm(!viewEditForm);
  };

  return (
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
            <span>{checklist.checklist_description}</span>
          </h4>
          <p>
            Completion Status:{" "}
            {checklist.checklist_istrue ? "Completed" : "Incomplete"}
          </p>
          <button onClick={() => handleUpdateStatus(checklist.id)}>
            {checklist.checklist_istrue ? "Incomplete" : "Completed"}
          </button>
        </div>
      )}
      <div className="checklist-actions">
        <button className="btn btn-primary" onClick={toggleView}>
          {viewEditForm ? "Cancel" : "Edit this checklist"}
        </button>
        <button
          className="btn btn-danger me-2"
          onClick={() => handleDelete(checklist.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Checklist;
