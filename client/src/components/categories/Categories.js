import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/categories")
            .then((res) => res.json())
            .then((res) => {
                setCategories(res);
            });
    }, []);

    return (
        <div className="row">
            <div className="col-12">
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/categories">Categories</Link>
                        </li>
                    </ol>
                </nav>
            </div>
            {categories.map((cat) => {
                return (
                    <div key={cat._id} className="col-3">
                        <div className="card mb-3">
                            <div className="card-body">
                                <Link to={`/categories/${cat._id}`}>
                                    <h5>{cat.name}</h5>
                                </Link>
                                <p>{cat.description}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Categories;
