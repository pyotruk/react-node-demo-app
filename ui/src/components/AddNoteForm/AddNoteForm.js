import React, { useState } from "react";
import "./AddNoteForm.css";

export default function AddNoteForm({postNote}) {
  const [text, setText] = useState([]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postNote(text);
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
