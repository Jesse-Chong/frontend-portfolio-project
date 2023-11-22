import { useState, useEffect } from "react";
import { capitalizeDescription } from "./helper";
import { Card } from "react-bootstrap";

function ChecklistForm({
  checklistDetails,
  handleSubmit,
  toggleView,
  children
}) {
  const [checklist, setChecklist] = useState({
    checklist_description: "",
    checklist_istrue: false,
  });

  useEffect(() => {
    if (checklistDetails && checklistDetails.id) {
      setChecklist({
        checklist_description: checklistDetails.checklist_description,
        checklist_istrue: checklistDetails.checklist_istrue
      });
    }
  }, [checklistDetails]);

  const onSubmit = async (event) => {
    event.preventDefault();

    const updatedChecklist = {
      ...checklist,
      id: checklistDetails ? checklistDetails.id : null,
      checklist_description: capitalizeDescription(
        checklist.checklist_description
      ),
      checklist_istrue: false,
    };

    await handleSubmit(updatedChecklist);

    if (checklistDetails) {
      toggleView();
    }

    setChecklist({
      checklist_description: "",
      checklist_istrue: false
    });
  };

  const handleTextChange = (event) => {
    setChecklist({ ...checklist, [event.target.id]: event.target.value });
  };

  return (
    <div className="New">
      <br />
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
        New Checklist
      </h1>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ marginBottom: "10px" }}
      >
        <Card className="border-5" style={{ borderColor: "black" }}>
          <Card.Body>
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
              <br />
              <div className="form-buttons">
                <button className="btn btn-success" type="submit">
                  Submit
                </button>
                {checklistDetails && (
                  <button className="btn btn-secondary" onClick={toggleView}>
                    Back
                  </button>
                )}
              </div>
            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default ChecklistForm;