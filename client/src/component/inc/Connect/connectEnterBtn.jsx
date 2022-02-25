import React from "react";

const connectEnterBtn = ({enterQueue}) => {
  return (
    <div className="col-12 col-md-6">
    <button
      type="button"
      className="btn d-flex btn-light button-control align-items-center justify-content-center" 
      onClick={() => enterQueue()}
    >
      <span className="material-icons">message</span>
      <p className="d-inline m-0">Enter Room</p>
    </button>
    </div>
  );
};

export default connectEnterBtn;
