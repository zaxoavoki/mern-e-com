import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../contexts/AuthContext";
import { saveOrUnsave, isSaved } from "../../api/products";
import { useAlert } from "react-alert";

export default function Big({ product }) {
  const { token, user } = useContext(AuthContext);
  const [star, setStar] = useState(false);
  const alert = useAlert();

  useEffect(() => {
    if (user) {
      isSaved(product._id, token)
        .then((res) => setStar(res))
        .catch(() => {});
    }
  });

  function saveProduct(id) {
    saveOrUnsave(id, token)
      .then((res) => {
        alert.success(`Product ${res ? "saved" : "unsaved"}.`);
        setStar(res);
      })
      .catch(() => alert.error("Can't save product"));
  }

  return (
    <div className="card mb-3">
      <img className="card-img-top" src={product.images[0]} alt="Image" />
      <div className="card-body">
        <Link to={`/products/${product._id}`}>
          <h6>{product.title}</h6>
        </Link>
        <p>{product.description.substr(0, 40)}...</p>
        <div className="btn-group w-100" role="group">
          <button type="button" className="btn btn-primary">
            $ {product.price}
          </button>
          {user && (
            <button className={`btn btn-${!star ? "outline-" : ""}primary`} onClick={() => saveProduct(product._id)}>
              <FontAwesomeIcon className={star ? "text-white" : ""} icon={star ? fasStar : faStar} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

Big.propTypes = {
  product: PropTypes.object,
};
