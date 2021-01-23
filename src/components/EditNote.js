import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

const EditNote = ({ list, onNoteSave }) => {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  const [updatedText, setUpdatedText] = useState("");

  if (list === undefined) {
    return <div>Please wait...</div>;
  } else if (list.length === 0) {
    return <div>List is empty</div>;
  }

  const note = list.find((element) => element.id === id);

  const onInputChange = (event) => {
    setUpdatedText(event.target.value);
  };

  const onSave = (event) => {
    event.preventDefault();
    onNoteSave(id, updatedText);
  };

  return (
    <div>
      <h2>Edit Note</h2>
      <p>{note.text}</p>
      <form>
        <label>Changes:</label>
        <input type="text" value={updatedText} onChange={onInputChange} />
        <button onClick={onSave}>Save</button>
      </form>
      <Link to="/">Home</Link>
    </div>
  );
};

export default EditNote;
