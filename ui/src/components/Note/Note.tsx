import "./Note.scss";
import {NoteProps} from "../../structures/NoteProps";
import React from "react";

export default function Note(props: {
  note: NoteProps,
  deleteNote: (id: number) => Promise<void>,
}) {
  const handleDelete = (event: React.FormEvent) => {
    event.preventDefault();
    props.deleteNote(props.note.id);
  }

  return (
    <p className="Note">
      <b>#{ props.note.id }</b>&nbsp;
      <span>{ props.note.text }</span>
      <i onClick={handleDelete}></i>
    </p>
  );
}
