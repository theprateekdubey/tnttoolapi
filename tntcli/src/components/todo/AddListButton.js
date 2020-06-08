import React from "react";
import { Link } from "react-router-dom";

const AddListButton = () => {
  return (
    <div className="mx-5">
      <Link
        type="button"
        className="rounded-pill btn btn-outline-success px-5 ml-5"
      >
        <i class="fa fa-plus" aria-hidden="true"></i> Add TODO
      </Link>
      <Link
        type="button"
        class="rounded-pill btn btn-outline-warning px-5 ml-5 "
      >
        <i class="fa fa-list" aria-hidden="true"></i> List Team Members
      </Link>
    </div>
  );
};

export default AddListButton;
