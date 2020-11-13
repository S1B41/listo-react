import React, { Component } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { Button } from "reactstrap";

import Notes from "/imports/collections/notes";

// export default (props) => {
export default class InputBox extends Component {
  constructor() {
    super();
    this.state = {};
  }

  insertNote() {
    if (!this.state.value) {
      return;
    }
    Notes.insert({ createdAt: new Date(), value: this.state.value });
    this.setState({ value: "" });
  }

  render() {
    return (
      // <div className="row">
      <div className="form-group row">
        <div className="offset-md-2 col-md-7">
          <TextareaAutosize
            value={this.state.value || ""}
            onChange={(e) => this.setState({ value: e.target.value })}
            placeholder="write something"
            className="form-control"
          />
        </div>
        <div className="col-md-1">
          <button onClick={() => this.insertNote()} className="btn btn-success">
            Add
          </button>
        </div>
      </div>
    );
  }
}
