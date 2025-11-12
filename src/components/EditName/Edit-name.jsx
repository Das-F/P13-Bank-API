import React, { useState, useEffect } from "react";
import "./Edit-name.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/profileSlice";

const username = "User";
function EditName() {
  const [username, setUsername] = useState("User");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const profile = useSelector((state) => state.profile);

  // Sync local fields from redux profile
  useEffect(() => {
    if (profile) {
      const f = profile.firstName || "";
      const l = profile.lastName || "";
      if (f && l) setUsername(`${f} ${l}`);
      else if (f) setUsername(f);
      else if (l) setUsername(l);
      setFirstName(f);
      setLastName(l);
    }
  }, [profile]);

  function openEditor() {
    // Prefill editor with values from redux profile
    setFirstName(profile?.firstName || "");
    setLastName(profile?.lastName || "");
    setIsEditing(true);
  }

  const dispatch = useDispatch();

  async function saveName() {
    const payload = {
      firstName: firstName || "",
      lastName: lastName || "",
    };

    try {
      // Dispatch the async thunk which will call the API and persist to storage
      const resultAction = await dispatch(updateProfile(payload));
      if (updateProfile.fulfilled.match(resultAction)) {
        const { firstName: f, lastName: l } = resultAction.payload;
        const newName = `${f || ""} ${l || ""}`.trim();
        if (newName) setUsername(newName);
        setIsEditing(false);
      } else {
        // Rejected: log error and don't close editor
        console.warn("Profile update rejected:", resultAction.payload || resultAction.error);
      }
    } catch (e) {
      console.warn("Profile update dispatch failed:", e);
    }
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
