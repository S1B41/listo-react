import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./navbar";
import InputBox from "./inputBox";
import NoteList from "./noteList";
import { ThemeContext, themes } from "./themeContext";

export class App extends Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme: state.theme === "dark" ? "light" : "dark",
        style: state.style === themes.dark ? themes.light : themes.dark,
      }));
    };

    this.state = {
      theme: "light",
      style: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        <div
          style={{
            minHeight: "100vh",
            background: this.state.style.background,
            color: this.state.style.color,
          }}
        >
          <Navbar />
          <div style={{ paddingTop: 50 }} className="app container">
            <InputBox />
            <NoteList />
          </div>
        </div>
      </ThemeContext.Provider>
    );
  }
}

App.contextType = ThemeContext;
