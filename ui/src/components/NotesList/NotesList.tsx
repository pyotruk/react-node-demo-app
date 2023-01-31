import React, { useEffect } from "react";
import Note from "../Note/Note";
import AddNoteForm from "../AddNoteForm/AddNoteForm";
import {fetchNotesAsync, selectNotes} from "../../redux/notesReducer";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";

export default function NotesList() {
  const notes = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNotesAsync());
  }, []);

  return (
      <div className="NotesList">
        <AddNoteForm/>
        {notes.notes && notes.notes.length > 0 && notes.notes.map((note, key) => {
          return <Note
            key={key}
            note={note}
          />
        })}
      </div>
  );
}
