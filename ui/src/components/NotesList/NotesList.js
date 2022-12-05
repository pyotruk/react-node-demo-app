import React, { useEffect, useState } from "react";
import Note from "../Note/Note";
import AddNoteForm from "../AddNoteForm/AddNoteForm";

const API_URL = "http://localhost:3033";

export default function NotesList() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${API_URL}/notes`);
      const notes = await response.json();
      setNotes(notes);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  const postNote = async (text) => {
    try {
      const response = await fetch(`${API_URL}/note`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({text})
      });
      const note = await response.json();
      setNotes(notes => [...notes, note]);
    } catch (err) {
      console.error(err);
      alert("Failed to post the note.");
    }
  }

  return (
      <div className="NotesList">
        <AddNoteForm postNote={postNote}/>
        {notes && notes.length > 0 && notes.map((note, key) => {
          return <Note key={key} note={note}/>
        })}
      </div>
  );
}
