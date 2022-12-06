import React, { useState } from "react";
import "./AddNoteForm.scss";

interface AddNoteFormProps {
  postNote: (text: string) => Promise<void>;
}

export default function AddNoteForm(props: AddNoteFormProps) {
  const [text, setText] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    props.postNote(text);
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
