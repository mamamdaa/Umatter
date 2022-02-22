import React from "react";

const connectEnterBtn = ({enterQueue}) => {
  return (
    <div className="col">
    <button
      type="button"
      className="btn btn-light button-control"
      onClick={() => enterQueue()}
    >
      <span className="material-icons">message</span>
      <p className="d-inline">Enter Room</p>
    </button>
    </div>
  );
};

export default connectEnterBtn;
