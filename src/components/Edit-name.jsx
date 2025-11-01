import React, { useState } from "react";
import "../styles/Edit-name.css";

const username = "User";
function EditName() {
  const [username, setUsername] = useState("User");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  function openEditor() {
    setFirstName("");
    setLastName("");
    setIsEditing(true);
  }

  function saveName() {
    const newName = `${firstName} ${lastName}`.trim();
    if (newName) {
      setUsername(newName);
    }
    setIsEditing(false);
  }

  function cancelEdit() {
    setIsEditing(false);
  }

  return (
    <div className="edit-name-page">
      <div className="user-page">
        <h1>
          Welcome back
          <br />
          {username}!
        </h1>
      </div>

      {!isEditing && (
        <div className="edit-name-container">
          <button className="edit-button" onClick={openEditor}>
            Edit Name
          </button>
        </div>
      )}

      {isEditing && (
        <div className="edit-name-modal">
          <input type="text" className="input-field" id="first-name" name="first-name" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" className="input-field" id="last-name" name="last-name" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <div className="buttons">
            <button className="change-button" onClick={saveName}>
              Save
            </button>
            <button className="change-button" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default EditName;
