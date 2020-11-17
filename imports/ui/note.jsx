import React, { Component } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPalette, faPen } from "@fortawesome/free-solid-svg-icons";
import { GithubPicker } from "react-color";

import { ThemeContext, paletteColors } from "./themeContext";

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      color,
      subColor,
      background,
      borderBottom,
      boxShadow,
    } = this.context.style;
    const {
      title,
      value,
      noteColor,
      createdAt,
      modifiedAt,
      onEdit,
      onRemove,
      onChangeColor,
    } = this.props;

    return (
      <div
        style={{
          padding: "15px 15px 10px",
          whiteSpace: "pre-wrap",
          marginLeft: 10,
          cursor: "grab",
          marginRight: 10,
          marginBottom: 20,
          height: "max-content",
          background: noteColor || background,
          color,
          borderRadius: 5,
          boxShadow,
          borderBottom,
        }}
        // className="offset-sm-2 col-sm-12 col-md-3 my-3"
      >
        <div title={title} style={{ fontSize: 18, overflow: "hidden" }}>
          <strong>{title}</strong>
        </div>
        {/* <div> */}
        <LinesEllipsis
          style={{ fontSize: 16, overflow: "hidden" }}
          text={value}
          maxLine="3"
          ellipsis=" ..."
        />
        {/* </div> */}
        {/* <div><button onClick={() => this.props.onRemove()}>Remove</button></div> */}
        <div
          style={{
            marginTop: 10,
            color: subColor,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <small style={{ fontSize: "xx-small" }}>
            created on {createdAt.toLocaleString("de")}
          </small>
          <small style={{ fontSize: "xx-small" }}>
            modified on {(modifiedAt || createdAt).toLocaleString("de")}
          </small>
        </div>
        <div>
          {/* <button className="btn"> */}
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            onClick={onEdit}
            icon={faPen}
            size="sm"
            color={subColor}
            title="Remove"
          />
          <FontAwesomeIcon
            style={{ marginLeft: 12, cursor: "pointer" }}
            onClick={onRemove}
            icon={faTrash}
            size="sm"
            color={subColor}
            title="Remove"
          />
          <FontAwesomeIcon
            style={{ marginLeft: 12, cursor: "pointer" }}
            onClick={e => {
              e.stopPropagation();
              this.setState({ showColorPicker: true });
            }}
            icon={faPalette}
            size="sm"
            color={subColor}
            title="Color"
          />
          {/* </button> */}
          {/* <button onClick={onRemove} className="btn btn-outline-danger btn-sm">
          </button> */}
        </div>
        {this.state.showColorPicker && (
          <div
            style={{
              position: "absolute",
              zIndex: "2",
            }}
          >
            <div
              style={{
                position: "fixed",
                top: "0px",
                right: "0px",
                bottom: "0px",
                left: "0px",
              }}
              onClick={e => {
                e.stopPropagation();
                this.setState({ showColorPicker: false });
              }}
            />
            <GithubPicker
              onChange={(color, e) => {
                e.stopPropagation();
                onChangeColor(color.hex);
              }}
              colors={paletteColors}
            />
          </div>
        )}
      </div>
    );
  }
}

Note.contextType = ThemeContext;
