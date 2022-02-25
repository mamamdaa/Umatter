import React from "react";

const connectLeaveBtn = ({leaveRoom}) => {
  return (
    <div className="col-12 col-md-6">
      <button
        type="button"
        className="btn btn-light button-control"
        onClick={() => leaveRoom()}
      >
        <span className="material-icons">exit_to_app</span>
        <p className="d-inline m-0">Leave Room</p>
      </button>
    </div>
  );
};

export default connectLeaveBtn;
