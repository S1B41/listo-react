import React, { Component } from "react";
import TextareaAutosize from "react-autosize-textarea";

import Notes from "/imports/collections/notes";
import { ThemeContext } from "./themeContext";

export default class InputBox extends Component {
  constructor(props) {
    super(props);
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
    const { color, background, buttonClass } = this.context.style;
    return (
      <div className="form-group row">
        <div className="col-9 col-sm-10 offset-md-2 col-md-7">
          <TextareaAutosize
            value={this.state.value || ""}
            onChange={e => this.setState({ value: e.target.value })}
            placeholder="write something"
            className="form-control"
            style={{
              color,
              background,
            }}
          />
        </div>
        <div className="col-2">
          <button
            onClick={() => this.insertNote()}
            className={buttonClass}
            style={{ outline: "none", boxShadow: "none" }}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}

InputBox.contextType = ThemeContext;
