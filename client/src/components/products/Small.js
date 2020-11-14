import React from "react";
import PropTypes from "prop-types";

export default function Small({ links, product }) {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex justify-content-between align-items-center">
                <span>
                    {product.title}
                    <span className="d-block small text-secondary">{product.description}</span>
                    {links && (
                        <span className="d-block small mt-2">
                            <a href="#">Summary</a>
                        </span>
                    )}
                </span>
                <span className="font-weight-bold align-self-start">{product.price}</span>
            </div>
        </div>
    );
}

Small.propTypes = {
    links: PropTypes.bool,
    product: PropTypes.object,
};
