import "./Note.scss";
import {Note as NoteProps} from "../../structures/NoteProps";
import React, {useState} from "react";

export default function Note(props: {
  note: NoteProps,
  updateNote: (id: number, text: string) => Promise<void>,
  deleteNote: (id: number) => Promise<void>,
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const [text, setText] = useState<string>(props.note.text);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await props.updateNote(props.note.id, text);
      setIsEditing(false);
    } catch (e) {
      setText(props.note.text);
    }
  }

  const handleDelete = (event: React.FormEvent) => {
    event.preventDefault();
    props.deleteNote(props.note.id);
  }

  return (
    <p className="Note">
      <b>#{ props.note.id }</b>&nbsp;
      {!isEditing &&
        <span>
          <span>{ text }</span>
          <i className="fa fa-pencil" onClick={toggleIsEditing}></i>
        </span>
      }
      {isEditing &&
        <span>
          <input
            name="text"
            value={ text }
            onChange={handleTextChange}
            required
          />
          <i className="fa fa-check" onClick={handleUpdate}></i>
        </span>
      }
      <i className="fa fa-times" onClick={handleDelete}></i>
    </p>
  );
}
