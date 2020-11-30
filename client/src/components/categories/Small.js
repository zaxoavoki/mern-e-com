import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-regular-svg-icons";

export default function Small({ category, removeCategory }) {
  return (
    <div className="card mb-3 p-3">
      <h6 className="mb-0 d-flex align-items-center">
        {category.name}
        <span className="ml-auto text-muted">
          <FontAwesomeIcon className="hoverable mr-1" icon={faEdit} size="sm" onClick={() => editCategory(category._id)} />
          <FontAwesomeIcon className="hoverable" icon={faTrashAlt} size="sm" onClick={() => removeCategory(category._id)} />
        </span>
      </h6>
      <p className="small mb-0 text-muted">{category.description}</p>
    </div>
  );
}

Small.propTypes = {
  category: PropTypes.any,
  removeCategory: PropTypes.any,
};
