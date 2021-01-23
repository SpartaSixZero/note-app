import React, { useState, useEffect } from "react";
import axios from "axios";
import uuid from "react-uuid";
import { Switch, Route } from "react-router-dom";
import NotesList from "./components/NotesList";
import AddNote from "./components/AddNote";
import EditNote from "./components/EditNote";

const App = () => {
  const [list, setList] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(0);
  const [hasInitialLoad, setHasInitialLoad] = useState(false);

  // Load data once from disk on initial load
  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await axios.get("http://localhost:8000/notes");

      setHasInitialLoad(true);

      setList(data.notes);
    };
    fetchNotes();
  }, []);

  // Whenever our list changes, we want to save the updates to
  // our file in disk
  useEffect(() => {
    const saveNotes = async () => {
      await axios.post("http://localhost:8000/notes", {
        notes: list,
      });
    };
    // prevent our initial save from overwriting our file
    if (hasInitialLoad) {
      saveNotes();
    }
  }, [list]);

  const onAddNote = (newNote) => {
    setList([...list, { id: uuid(), text: newNote }]);
  };

  const onEditNote = (noteId) => {
    setCurrentNoteId(noteId);
  };

  const onNoteSave = (id, newText) => {
    console.log(list);
    console.log(newText);

    const listCopy = [...list];
    // find the note object with the matchingId and update its text
    for (let element of listCopy) {
      if (element.id === id) {
        element.text = newText;
      }
    }

    console.log("new listCopy is");
    console.log(listCopy);

    setList(listCopy);
  };

  return (
    <div>
      <h1>Notes App</h1>
      <Switch>
        <Route path="/:id">
          <EditNote list={list} onNoteSave={onNoteSave} />
        </Route>
        <Route path="/">
          <NotesList list={list} onEditNote={onEditNote} />
          <AddNote onAddNote={onAddNote} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
