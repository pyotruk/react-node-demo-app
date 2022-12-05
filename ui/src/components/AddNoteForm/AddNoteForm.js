import React from "react";
import "./AddNoteForm.css";

export default class AddNoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({text: event.target.value});
  }

  async handleSubmit(event) {
    try {
      await fetch("http://localhost:3033/note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({text: this.state.text})
      });
    } catch (err) {
      console.error(err);
    }
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
        name="text"
        value={this.state.text}
        onChange={this.handleChange}
        placeholder="type your note"
        required
        />
        <button type="submit">Add note</button>
      </form>
    );
  }
}
