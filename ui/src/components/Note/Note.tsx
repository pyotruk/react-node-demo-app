import "./Note.scss";
import {Note as NoteProps} from "../../structures/NoteProps";
import React, {useState} from "react";
import {useAppDispatch} from "../../redux/hooks";
import {deleteNoteAsync, updateNoteAsync} from "../../redux/notesReducer";

export default function Note(props: {
  note: NoteProps,
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

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(updateNoteAsync({id: props.note.id, text}));
      setIsEditing(false);
    } catch (e) {
      setText(props.note.text);
    }
  }

  const handleDelete = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(deleteNoteAsync(props.note.id));
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
