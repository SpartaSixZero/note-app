import React from "react";
import Note from "./Note";

const NotesList = ({ list, onEditNote }) => {
  const renderList = () => {
    if (list.length === 0) {
      return null;
    }

    return list.map(({ id, text }) => {
      return <Note key={id} id={id} text={text} onEditNote={onEditNote} />;
    });
  };

  return <div>{renderList()}</div>;
};

export default NotesList;
