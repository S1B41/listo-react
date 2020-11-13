import React from "react";

export default () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#4995C7",
        height: 50,
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
      <div>User</div>
    </div>
  );
};
