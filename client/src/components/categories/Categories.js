import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAll as getCategories } from "../../api/categories";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/categories">Categories</Link>
          </li>
        </ol>
      </nav>
      <div className="card-columns">
        {categories.map((cat) => (
          <div key={cat._id} className="">
            <div className="card mb-3">
              <div className="card-body">
                <Link to={`/categories/${cat._id}`}>
                  <h5>{cat.name}</h5>
                </Link>
                <p>{cat.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Categories;
