import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import React, { Component } from "react";
import Modal from "react-modal";
import TextareaAutosize from "react-autosize-textarea";

import Notes from "/imports/collections/notes";
import { ThemeContext } from "./themeContext";

import Note from "./note";

class notelist extends Component {
  constructor() {
    super();
    this.state = { update: {} };
  }

  onSave() {
    if (!Object.keys(this.state.update).length) {
      this.setState({ editModal: false });
      return;
    }

    const _id = this.props.notes.find(n => n._id === this.state.currentNote)
      ._id;
    const $set = { ...this.state.update, modifiedAt: new Date() };

    Notes.update({ _id }, { $set });

    this.cleanupState();
  }

  onUpdate(update, callback) {
    const safeCallback = callback || null;
    this.setState(
      { ...update, update: { ...this.state.update, ...update } },
      safeCallback
    );
  }

  onRemove(e, _id) {
    e.stopPropagation();
    confirm("remove note?") && Notes.remove({ _id });
  }

  onClose() {
    if (!Object.keys(this.state.update).length) {
      this.setState({ currentNote: null, editModal: false });
    } else {
      confirm("Discard changes?") && this.cleanupState();
    }
  }

  cleanupState(state) {
    const safeState = state || {};
    const update = this.state.update;

    Object.keys(update).forEach(k => (update[k] = ""));

    this.setState({
      ...update,
      ...safeState,
      update: {},
      currentNote: null,
      editModal: false,
    });
  }

  modal() {
    if (!this.state.editModal) {
      return null;
    }

    Modal.setAppElement("#react-target");

    const { color, background, buttonClass } = this.context.style;
    const customStyles = {
      content: {
        width: "50%",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        background,
        color,
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
        <div>
          <label>Title</label>
          <input
            className="form-control"
            onChange={e => this.onUpdate({ title: e.target.value })}
            value={
              this.state.title ||
              this.props.notes.find(n => n._id === this.state.currentNote).title
            }
            style={{
              color,
              background,
            }}
          />
        </div>
        <div style={{ marginBottom: 20, marginTop: 20 }}>
          <label>Note</label>
          <TextareaAutosize
            onChange={e => this.onUpdate({ value: e.target.value })}
            value={
              this.state.value ||
              this.props.notes.find(n => n._id === this.state.currentNote).value
            }
            className="form-control"
            style={{
              color,
              background,
            }}
          />
        </div>
        <div style={{ textAlign: "center", marginTop: 10 }}>
          <button
            className="btn btn-outline-success btn-sm"
            onClick={() => this.onSave()}
          >
            Save
          </button>
          <button
            className={`${buttonClass} btn-sm ml-1`}
            onClick={() => this.onClose()}
          >
            Close
          </button>
        </div>
      </Modal>
    );
  }

  render() {
    return (
      <div className="row">
        {(this.props.notes || []).map(note => (
          <Note
            key={note._id}
            title={note.title}
            value={note.value}
            noteColor={note.color}
            createdAt={note.createdAt}
            modifiedAt={note.modifiedAt}
            onEdit={() =>
              this.setState({ currentNote: note._id, editModal: true })
            }
            onRemove={e => this.onRemove(e, note._id)}
            onChangeColor={color =>
              this.setState({ currentNote: note._id }, () =>
                this.onUpdate({ color }, this.onSave)
              )
            }
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

notelist.contextType = ThemeContext;
