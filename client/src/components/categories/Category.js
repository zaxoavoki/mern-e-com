import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import Big from "../products/Big";

function Category() {
    const { categoryId } = useParams();
    const [category, setCategory] = useState({ products: [] });

    useEffect(() => {
        fetch(`http://localhost:3001/categories/${categoryId}`)
            .then((res) => res.json())
            .then((res) => {
                setCategory(res);
            });
    }, []);

    return (
        <>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/categories">Categories</Link>
                    </li>
                    <li className="breadcrumb-item active">{category.name}</li>
                </ol>
            </nav>
            {!category.products.length && <h6>There is no any product yet</h6>}
            <div className="row">
                {category.products.map((product) => (
                    <div key={product._id} className="col-3">
                        <Big product={product} />
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
