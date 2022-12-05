export default function Note(props) {
  return (
    <p>
      <b>#{ props.note.id }</b>&nbsp;
      <span>{ props.note.text }</span>
    </p>
  );
}
