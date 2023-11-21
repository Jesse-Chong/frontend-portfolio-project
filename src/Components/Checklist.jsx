import { useState } from "react";
import ChecklistForm from "./ChecklistForm";
import { capitalizeDescription } from "./helper";

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
          <p>
            {checklist.checklist_title}{" "}
            <span>{capitalizeDescription(checklist.checklist_description)}</span>
          </p>

          <button onClick={() => handleUpdateStatus(checklist.id)}>
            Done:{checklist.checklist_istrue ? "👍" : "👎"}
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
