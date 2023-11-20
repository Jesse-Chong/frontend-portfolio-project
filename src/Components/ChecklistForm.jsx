import { useState, useEffect } from "react";

function ChecklistForm({
  checklistDetails,
  handleSubmit,
  toggleView,
  children,
}) {
  const [checklist, setChecklist] = useState({
    checklist_description: "",
    checklist_istrue: false,
  });

  useEffect(() => {
    if (checklistDetails && checklistDetails.id) {
      setChecklist({
        checklist_description: checklistDetails.checklist_description,
        checklist_istrue: checklistDetails.checklist_istrue,
      });
    }
  }, [checklistDetails]);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting checklist:", checklist);
    handleSubmit({
      ...checklist,
      id: checklistDetails ? checklistDetails.id : null,
    });
    if (checklistDetails) {
      toggleView();
    }

    setChecklist({
      checklist_description: "",
      checklist_istrue: false,
    });
  };

  const handleTextChange = (event) => {
    setChecklist({ ...checklist, [event.target.id]: event.target.value });
  };

  return (
    <div className="ChecklistForm">
      {children}
      <form onSubmit={onSubmit}>
        <label htmlFor="checklist_description">Description:</label>
        <input
          id="checklist_description"
          type="text"
          required
          value={checklist.checklist_description}
          onChange={handleTextChange}
          placeholder="Checklist description"
        />
        <br />
        <label htmlFor="checklist_istrue">Completed:</label>
        <input
          id="checklist_istrue"
          type="checkbox"
          checked={checklist.checklist_istrue}
          onChange={() =>
            setChecklist({
              ...checklist,
              checklist_istrue: !checklist.checklist_istrue,
            })
          }
        />
        <br />
        <button className="btn btn-success" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ChecklistForm;