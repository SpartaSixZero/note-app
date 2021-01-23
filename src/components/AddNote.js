import React, { useState } from "react";

const AddNote = ({ onAddNote }) => {
  const [note, setNote] = useState("");

  const onTextChange = (event) => {
    setNote(event.target.value);
  };

  const onAddNoteClick = (event) => {
    event.preventDefault();
    onAddNote(note);
  };

  return (
    <form>
      <label>Add a new note:</label>
      <input type="text" value={note} onChange={onTextChange} />
      <button onClick={onAddNoteClick}>Add Note</button>
    </form>
  );
};

export default AddNote;
