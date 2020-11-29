import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

export default function Small({ links, deleteFromSaved, product }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <p className="d-flex justify-content-between align-items-center mb-2">
          {product.title}
          {!links && <FontAwesomeIcon icon={faTrashAlt} className="text-secondary delete-icon" onClick={() => deleteFromSaved(product._id)} />}
        </p>
        <p className="small text-secondary mb-1">{product.description}</p>
        <p className="font-weight-bold mb-0 d-flex justify-content-between align-items-baseline">
          <span>{product.price} $</span>
          {links && (
            <span className="d-block small mt-2">
              <a href="#">Summary</a>
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

Small.propTypes = {
  links: PropTypes.bool,
  product: PropTypes.object,
  deleteFromSaved: PropTypes.func,
};
