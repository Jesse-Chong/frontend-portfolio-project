import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Checklist from "./Checklist";
import ChecklistForm from "./ChecklistForm";

const API = import.meta.env.VITE_API_URL;

function Checklists({ checklists, setChecklists }) {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const handleAdd = async (newChecklist) => {
    try {
      const checklistToAdd = { ...newChecklist, checklist_istrue: false };

      const response = await fetch(`${API}/todo/${id}/checklist`, {
        method: "POST",
        body: JSON.stringify(checklistToAdd),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseJSON = await response.json();
        setChecklists((prevChecklists) => [responseJSON, ...prevChecklists]);
      } else {
        console.error("Error adding checklist:", response.status);
      }
    } catch (error) {
      console.error("Add Checklist Error:", error);
    }
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
          setChecklists((prevChecklists) =>
            prevChecklists.filter(
              (checklist) => checklist.id !== deletedChecklist.id
            )
          );
        }
      } else {
        console.error("Error deleting checklist:", response.status);
      }
    } catch (error) {
      console.error("Error deleting checklist:", error);
    }
  };

  const handleEdit = async (updatedChecklist) => {
    try {
      if (!updatedChecklist || !updatedChecklist.id) {
        console.error("Error: Checklist id is missing.");
        return;
      }

      const response = await fetch(
        `${API}/todo/${id}/checklist/${updatedChecklist.id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedChecklist),
          headers: {
            "Content-Type": "application/json"
          },
        }
      );

      if (response.ok) {
        const responseJSON = await response.json();
        setChecklists((prevChecklists) =>
          prevChecklists.map((checklist) =>
            checklist.id === updatedChecklist.id ? responseJSON : checklist
          )
        );
      } else {
        console.error("Error editing checklist:", response.status);
      }
    } catch (error) {
      console.error("Edit Checklist Error:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetch(`${API}/todo/${id}/checklist`)
        .then((response) => response.json())
        .then((responseJSON) => {

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
            id={id}
            handleSubmit={handleEdit}
            handleDelete={handleDelete}
            setChecklists={setChecklists}
          />
        ))
      ) : (
        <p>No checklists available</p>
      )}
    </section>
  );
}

export default Checklists;