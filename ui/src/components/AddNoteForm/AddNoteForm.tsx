import React, { useState } from "react";
import "./AddNoteForm.scss";
import {useAppDispatch} from "../../redux/hooks";
import {postNote} from "../../redux/notesSlice";

export default function AddNoteForm() {
  const dispatch = useAppDispatch();

  const [text, setText] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(postNote(text));
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
