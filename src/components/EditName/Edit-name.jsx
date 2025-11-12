import React, { useState, useEffect } from "react";
import "./Edit-name.css";

const username = "User";
function EditName() {
  const [username, setUsername] = useState("User");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // On mount, try to read profileInfos from storage to prefill fields
  useEffect(() => {
    try {
      const stored = localStorage.getItem("profileInfos") || sessionStorage.getItem("profileInfos");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.firstName || parsed?.lastName) {
          if (parsed.firstName && parsed.lastName) setUsername(`${parsed.firstName} ${parsed.lastName}`);
          else if (parsed.firstName) setUsername(parsed.firstName);
          else if (parsed.lastName) setUsername(parsed.lastName);
          if (parsed.firstName) setFirstName(parsed.firstName);
          if (parsed.lastName) setLastName(parsed.lastName);
        }
      }
    } catch (e) {
      // ignore parse errors
      console.warn("Failed to parse profileInfos:", e);
    }
  }, []);

  function openEditor() {
    // Prefill editor with stored profile infos when available
    try {
      const stored = localStorage.getItem("profileInfos") || sessionStorage.getItem("profileInfos");
      if (stored) {
        const parsed = JSON.parse(stored);
        setFirstName(parsed?.firstName || "");
        setLastName(parsed?.lastName || "");
      } else {
        setFirstName("");
        setLastName("");
      }
    } catch (e) {
      setFirstName("");
      setLastName("");
    }
    setIsEditing(true);
  }

  async function saveName() {
    const payload = {
      firstName: firstName || "",
      lastName: lastName || "",
    };

    // Determine where the auth token is stored (localStorage preferred)
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    const useLocal = !!localStorage.getItem("authToken");
    const storage = useLocal ? localStorage : sessionStorage;

    // Try to send the update to the API if we have a token
    if (token) {
      try {
        const res = await fetch("http://localhost:3001/api/v1/user/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          // Try to parse error message for debugging
          const err = await res.json().catch(() => null);
          console.warn("Profile update failed:", err || res.status);
          // Do not proceed to update storage/username on API failure
          return;
        }
      } catch (e) {
        console.warn("Profile update request failed:", e);
        return;
      }
    } else {
      // No token: warn but still update local UI/storage
      console.warn("No auth token found — skipping API update and updating local storage only.");
    }

    // Persist the profileInfos in the same storage used for the token (or localStorage by default)
    try {
      storage.setItem("profileInfos", JSON.stringify(payload));
    } catch (e) {
      console.warn("Failed to write profileInfos to storage:", e);
    }

    const newName = `${payload.firstName} ${payload.lastName}`.trim();
    if (newName) setUsername(newName);
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
