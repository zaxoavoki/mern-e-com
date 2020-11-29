import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";

import { getOne as getCategory } from "../../api/categories";
import Big from "../products/Big";

function Category() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState({ products: [] });

  useEffect(() => {
    getCategory(categoryId)
      .then((res) => setCategory(res))
      .catch(() => {});
  }, []);

  return (
    <>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/categories">Categories</Link>
          </li>
          <li className="breadcrumb-item active">{category.name || "Not found"}</li>
        </ol>
      </nav>
      {category.products.length === 0 && <p>Category was not found.</p>}
      <div className="row">
        {category.products.map((product) => (
          <div key={product._id} className="col-3">
            <Big category={category} product={product} />
          </div>
        ))}
      </div>
    </>
  );
}

Category.propTypes = {
  category: PropTypes.object,
};

export default Category;
