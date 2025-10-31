import "../styles/Edit-name.css";

function EditName() {
  return (
    <div className="edit-name-modal">
      <input type="text" className="input-field" id="first-name" name="first-name" placeholder="First Name" />
      <input type="text" className="input-field" id="last-name" name="last-name" placeholder="Last Name" />
      <div className="buttons">
        <button className="change-button">Save</button>
        <button className="change-button">Cancel</button>
      </div>
    </div>
  );
}
export default EditName;
