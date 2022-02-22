import React from "react";

const connectLeaveBtn = ({leaveRoom}) => {
  return (
    <div className="col">
      <button
        type="button"
        className="btn btn-light button-control"
        onClick={() => leaveRoom()}
      >
        <span className="material-icons">exit_to_app</span>
        <p className="d-inline">Leave Room</p>
      </button>
    </div>
  );
};

export default connectLeaveBtn;
