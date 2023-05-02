import React from "react";

function Spinner() {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-border"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span class="sr-only"></span>
      </div>
    </div>
  );
}

export default Spinner;
