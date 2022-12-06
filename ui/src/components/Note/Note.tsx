import {NoteProps} from "../../structures/NoteProps";

export default function Note(props: {note: NoteProps}) {
  return (
    <p>
      <b>#{ props.note.id }</b>&nbsp;
      <span>{ props.note.text }</span>
    </p>
  );
}
