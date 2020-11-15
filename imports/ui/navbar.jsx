import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

import { ThemeContext } from "./themeContext";

export default () => {
  return (
    <ThemeContext.Consumer>
      {({ style, toggleTheme }) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: style.navbarBackground,
            borderBottom: style.navbarBorder,
            height: 55,
            color: "#fff",
            fontWeight: 700,
            fontSize: "26px",
            padding: "0 30px",
          }}
        >
          <div>
            <img src="/listo-logo.png" width="40" />
            <span style={{ marginLeft: 10 }}>Listo</span>
          </div>
          <div>
            <button
              className={`${style.buttonClass} btn-sm`}
              onClick={() => toggleTheme()}
              style={{ outline: "none", boxShadow: "none" }}
              title="Dark Mode"
            >
              <FontAwesomeIcon icon={faMoon} size="sm" />
            </button>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  );
};
