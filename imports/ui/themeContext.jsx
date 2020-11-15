import React from "react";

export const themes = {
  light: {
    color: "#1a1a1a",
    subColor: "#aaa",
    background: "#ffffff",
    boxShadow: "1px 2px 10px #ccc",
    borderBottom: "3px solid #ccc",
    navbarBackground: "#4995c7",
    navbarBorder: "3px solid #2a6c97",
    buttonClass: "btn btn-outline-dark",
  },
  dark: {
    color: "#ffffff",
    subColor: "#777",
    background: "#222222",
    boxShadow: "1px 2px 10px #1a1a1a",
    borderBottom: "3px solid #1a1a1a",
    navbarBackground: "#222222",
    navbarBorder: "3px solid #1a1a1a",
    buttonClass: "btn btn-outline-light",
  },
};

export const ThemeContext = React.createContext({
  theme: themes.light,
  toggleTheme: () => {},
});
