import React, { useEffect, useState } from "react";
import Note from "../Note/Note";
import AddNoteForm from "../AddNoteForm/AddNoteForm";
import {NoteProps} from "../../structures/NoteProps";

const API_URL = "http://localhost:3033";
const HTTP_HEADERS = {
  "Content-Type": "application/json"
};

export default function NotesList() {
  const [notes, setNotes] = useState<NoteProps[]>([]);

  const fetchNotes = async (): Promise<void> => {
    try {
      const response: Response = await fetch(`${API_URL}/notes`);
      const notes: NoteProps[] = await response.json();
      setNotes(notes);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  const postNote = async (text: string): Promise<void> => {
    try {
      const response: Response = await fetch(`${API_URL}/note`, {
        method: "POST",
        headers: HTTP_HEADERS,
        body: JSON.stringify({text})
      });
      const note: NoteProps = await response.json();
      setNotes((notes: NoteProps[]) => [...notes, note]);
    } catch (err) {
      console.error(err);
      alert("Failed to post the note.");
    }
  }

  const updateNote = async (id: number, text: string): Promise<void> => {
    try {
      await fetch(`${API_URL}/note`, {
        method: "PATCH",
        headers: HTTP_HEADERS,
        body: JSON.stringify({id, text})
      });
    } catch (err) {
      console.error(err);
      alert("Failed to update the note.");
    }
  }

  const deleteNote = async (id: number): Promise<void> => {
    try {
      await fetch(`${API_URL}/note`, {
        method: "DELETE",
        headers: HTTP_HEADERS,
        body: JSON.stringify({id})
      });
      setNotes((notes: NoteProps[]) => notes.filter((note: NoteProps) => note.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete the note.");
    }
  }

  return (
      <div className="NotesList">
        <AddNoteForm postNote={postNote}/>
        {notes && notes.length > 0 && notes.map((note, key) => {
          return <Note
            key={key}
            note={note}
            updateNote={updateNote}
            deleteNote={deleteNote}
          />
        })}
      </div>
  );
}
