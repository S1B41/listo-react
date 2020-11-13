import React from "react";
import Navbar from "./navbar";
import InputBox from "./inputBox";
import NoteList from "./noteList";
import "bootstrap/dist/css/bootstrap.min.css";

export default () => (
  <>
    <Navbar />
    <div style={{ paddingTop: 50 }} className="app container">
      <InputBox />
      <NoteList />
    </div>
  </>
);
