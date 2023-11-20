import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Checklist from "./Checklist";
import ChecklistForm from "./ChecklistForm";

const API = import.meta.env.VITE_API_URL;

function Checklists({ checklists, setChecklists }) {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const handleAdd = (newChecklist) => {
    fetch(`${API}/todo/${id}/checklist`, {
      method: "POST",
      body: JSON.stringify(newChecklist),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log("Fetched Checklists:", responseJSON);
        setChecklists((prevChecklists) => [responseJSON, ...prevChecklists]);
      })
      .catch((error) => console.error("Add Checklist Error:", error));
  };

  const handleDelete = async (checklistId) => {
    try {
      const response = await fetch(
        `${API}/todo/${id}/checklist/${checklistId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const deletedChecklist = await response.json();

        if (deletedChecklist && deletedChecklist.id) {
          console.log("Checklist deleted successfully");

          setChecklists((prevChecklists) =>
            prevChecklists.filter(
              (checklist) => checklist.id !== deletedChecklist.id
            )
          );
        } else {
          console.log("Checklist not found:", checklistId);
        }
      } else {
        console.log("Error deleting checklist:", response.status);
      }
    } catch (error) {
      console.error("Error deleting checklist:", error);
    }
  };

  const handleEdit = (updatedChecklist) => {
    // Check if the updatedChecklist object has an 'id' property
    if (!updatedChecklist || !updatedChecklist.id) {
      console.error("Error: Checklist id is missing.");
      return;
    }

    fetch(`${API}/todo/${id}/checklist/${updatedChecklist.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedChecklist),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseJSON) => {
        console.log("Edited Checklist:", responseJSON);
        setChecklists((prevChecklists) =>
          prevChecklists.map((checklist) =>
            checklist.id === updatedChecklist.id ? responseJSON : checklist
          )
        );
      })
      .catch((error) => console.error("Edit Checklist Error:", error));
  };

  const handleUpdateStatus = async (checklistId) => {
    try {
      const response = await fetch(
        `${API}/todo/${id}/checklist/${checklistId}/completion`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        const updatedChecklist = await response.json();

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

  useEffect(() => {
    if (id) {
      fetch(`${API}/todo/${id}/checklist`)
        .then((response) => response.json())
        .then((responseJSON) => {
          console.log("Fetched Checklists:", responseJSON);

          if (
            responseJSON &&
            responseJSON.allChecklist &&
            Array.isArray(responseJSON.allChecklist)
          ) {
            setChecklists(responseJSON.allChecklist);
          } else {
            console.error("Invalid response format:", responseJSON);
            setChecklists([]);
          }

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching checklists:", error);
          setChecklists([]);
          setLoading(false);
        });
    }
  }, [id, API, setChecklists]);

  return (
    <section className="Checklists">
      <ChecklistForm handleSubmit={handleAdd}>
        <h3>Add a New Checklist</h3>
      </ChecklistForm>
      {loading ? (
        <p>Loading checklists...</p>
      ) : Array.isArray(checklists) && checklists.length > 0 ? (
        checklists.map((checklist) => (
          <Checklist
            key={checklist.id}
            checklist={checklist}
            handleSubmit={handleEdit}
            handleDelete={handleDelete}
            handleUpdateStatus={handleUpdateStatus}
          />
        ))
      ) : (
        <p>No checklists available</p>
      )}
    </section>
  );
}

export default Checklists;