import React, { useEffect, useState } from "react";
import Note from "../Note/Note";
import AddNoteForm from "../AddNoteForm/AddNoteForm";

export default function NotesList() {
  const [notes, setNotes] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3033/notes");
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
  },[]);

  return (
      <div className="NotesList">
        <AddNoteForm/>
        {notes && notes.length > 0 && notes.map((note) => {
          return <Note note={note}/>
        })}
      </div>
  );
}
