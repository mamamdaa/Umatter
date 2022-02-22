import React from "react";

const connectWaitingBtn = ({ leaveQueue }) => {
  return (
    <>
      <div className="col">
        <button type="button" className="btn btn-light button-control">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </button>
      </div>
      <div className="col-4">
        <button
          type="button "
          className="btn btn-light button-control"
          onClick={() => leaveQueue()}
        >
          <span className="material-icons">close</span>
          <p className="d-inline">Cancel</p>
        </button>
      </div>
    </>
  );
};

export default connectWaitingBtn;
