import React, { Component } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import NoteActions from "./noteActions";
import NoteInfo from "./noteInfo";
import NoteText from "./noteText";

export default class Note extends Component {
  render() {
    const { value, createdAt, onEdit, onRemove } = this.props;
    return (
      <div
        onClick={onEdit}
        style={{
          cursor: "pointer",
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          // lineBreak: "anywhere",
        }}
        className="note offset-md-3 col-md-6 my-3"
      >
        {/* <div> */}
        <LinesEllipsis text={value} maxLine="3" ellipsis=" ..." />
        {/* </div> */}
        {/* <div><button onClick={() => this.props.onRemove()}>Remove</button></div> */}
        <div>
          <small style={{ fontSize: "xx-small" }}>
            created on {createdAt.toLocaleString("de")}
          </small>
        </div>
        <div>
          {/* <button className="btn"> */}
          <FontAwesomeIcon
            onClick={onRemove}
            icon={faTrash}
            size="xs"
            color="#ccc"
          />
          {/* </button> */}
          {/* <button onClick={onRemove} className="btn btn-outline-danger btn-sm">
          </button> */}
        </div>
        {/* <NoteActions /> */}
      </div>
    );
  }
}
