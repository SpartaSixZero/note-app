import React from "react";
import { Link } from "react-router-dom";

const Note = ({ id, text }) => {
  return (
    <div>
      {text}
      <Link to={`/${id}`}>Edit</Link>
    </div>
  );
};

export default Note;
