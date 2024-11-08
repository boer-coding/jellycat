import React, { useState } from "react";
import "./userInformation.css";
import updateUser from "../../../helpers/userRoutes/updateUser";
import deleteUser from "../../../helpers/userRoutes/deleteUser";

const UserInformation = (props) => {
  const { id ,email, username } = props;

  const [editState, setEditState] = useState(true);
  const [saveState, setSaveState] = useState(false);
  const [loading, setLoading] = useState(false); // Optional loading state for feedback
  const [newUsername, setNewUsername] = useState(username); // State for new username

  const handleEdit = () => {
    setEditState(false);
    setSaveState(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUser(newUsername, email);
      console.log("Username updated successfully");
      setEditState(true);
      setSaveState(false);
    } catch (error) {
      console.error("Error updating username:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async ()=>{
    await deleteUser(id);
  }
  return (
    <div>
      <h2>User Information</h2>
      {/* Example content */}
      <div id="displayUserInfo">
        {editState && <div className="displayRow">Name: {newUsername}</div>}
        {saveState && (
          <div className="displayRow">
            <label htmlFor="editName">Name: </label>
            <input
              id="editName"
              type="text"
              value={newUsername} // Controlled component
              onChange={(e) => setNewUsername(e.target.value)} // Handle change
            />
          </div>
        )}

        <div className="displayRow">Email: {email}</div>
        {editState && (
          <button className="changeButton" id="editButton" onClick={handleEdit }>
            Edit
          </button>
        )}
        {saveState && (
          <div id="buttonDisplay">
            <button
              className="changeButton"
              id="saveButton"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              className="changeButton"
              id="deleteButton"
              
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInformation;
