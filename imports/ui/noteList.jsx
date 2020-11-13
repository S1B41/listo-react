import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import React, { Component } from "react";
import Modal from "react-modal";
import TextareaAutosize from "react-autosize-textarea";

import Notes from "/imports/collections/notes";

import Note from "./note";

class notelist extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onEdit() {
    if (!this.state.value) {
      return;
    }

    const notes = this.props.notes;
    const index = notes.findIndex((n) => n._id === this.state.currentNote);

    notes[index].value = this.state.value;
    Notes.update(
      { _id: notes[index]._id },
      { $set: { value: this.state.value, modifiedAt: new Date() } }
    );
    this.setState({ editModal: false, value: "" });
  }

  onRemove(e, _id) {
    e.stopPropagation();
    confirm("remove note?") && Notes.remove({ _id });
  }

  modal() {
    if (!this.state.editModal) {
      return null;
    }

    Modal.setAppElement("#react-target");

    const customStyles = {
      content: {
        width: "40%",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
      },
    };

    return (
      <Modal
        isOpen={this.state.editModal}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <TextareaAutosize
          onChange={(e) => this.setState({ value: e.target.value })}
          value={
            this.state.value ||
            this.props.notes.find((n) => n._id === this.state.currentNote).value
          }
          className="form-control"
        />
        <button onClick={() => this.onEdit()}>save</button>
        <button
          onClick={() => this.setState({ currentNote: null, editModal: false })}
        >
          close
        </button>
      </Modal>
    );
  }

  render() {
    console.log(this.props);
    return (
      // <div style={{ margin: '0' }}>
      // <div className="row d-flex flex-column justify-content-center">
      <div className="row">
        {(this.props.notes || []).map((note) => (
          <Note
            key={note._id}
            value={note.value}
            createdAt={note.createdAt}
            modifiedAt={note.modifiedAt}
            onEdit={() =>
              this.setState({ currentNote: note._id, editModal: true })
            }
            onRemove={(e) => this.onRemove(e, note._id)}
          />
        ))}
        {this.modal()}
      </div>
    );
  }
}

const NoteList = withTracker(({}) => {
  // Meteor.subscribe('notes');
  const sub = Meteor.subscribe("notes");
  const notes = Notes.find({}, { sort: { createdAt: -1 } }).fetch();
  return {
    loading: !sub.ready(),
    notes,
  };
})(notelist);

export default NoteList;
