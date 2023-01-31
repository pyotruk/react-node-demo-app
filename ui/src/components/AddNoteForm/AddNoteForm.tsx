import React, { useState } from "react";
import "./AddNoteForm.scss";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {postNoteAsync, selectNotes} from "../../redux/notesReducer";

export default function AddNoteForm() {
  // const notes = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();

  const [text, setText] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(postNoteAsync(text));
    setText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="text"
        value={text}
        onChange={handleChange}
        placeholder="type your note"
        required
      />
      <button type="submit">Add note</button>
    </form>
  );
}
