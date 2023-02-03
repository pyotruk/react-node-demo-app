import "./Note.scss";
import {Note as NoteProps, NoteId} from "../../structures/NoteProps";
import React, {useState} from "react";
import {useAppDispatch} from "../../redux/hooks";
import {deleteNote, updateNote} from "../../redux/notesSlice";

export default function Note(props: {
  note: NoteProps,
  isUpdating: false | NoteId,
  isDeleting: false | NoteId,
}) {
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const [text, setText] = useState<string>(props.note.text);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(updateNote({id: props.note.id, text})).then(() => {
      setIsEditing(false);
    });
  }

  const handleDelete = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(deleteNote(props.note.id));
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
          {props.isUpdating !== props.note.id && <i className="fa fa-check" onClick={handleUpdate}></i>}
          {props.isUpdating === props.note.id && <i className="fa fa-spinner"></i>}
        </span>
      }
      {props.isDeleting !== props.note.id && <i className="fa fa-times" onClick={handleDelete}></i>}
      {props.isDeleting === props.note.id && <i className="fa fa-spinner"></i>}
    </p>
  );
}
