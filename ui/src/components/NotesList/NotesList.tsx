import React, { useEffect } from "react";
import Note from "../Note/Note";
import AddNoteForm from "../AddNoteForm/AddNoteForm";
import {fetchNotes, selectNotes} from "../../redux/notesSlice";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";

export default function NotesList() {
  const notes = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  return (
      <div className="NotesList">
        {notes.isFetching && <p>Loading...</p>}
        {!notes.isFetching && <AddNoteForm isPosting={notes.isPosting}/>}
        {notes.notes && notes.notes.length > 0 && notes.notes.map(note => {
          return <Note
            key={note.id}
            note={note}
            isUpdating={notes.isUpdating}
            isDeleting={notes.isDeleting}
          />
        })}
      </div>
  );
}
