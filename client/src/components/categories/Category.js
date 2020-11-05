import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import faker from "faker";

function Category({ category }) {
    const { categoryId } = useParams();
    const products = Array.from({ length: 15 }, (e) => {
        return {
            id: faker.random.uuid(),
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.random.float(),
            images: [faker.image.imageUrl()],
        };
    });
    return (
        <div>
            <h4 className="mb-5">CategoryId: {categoryId}</h4>
            <div className="row">
                {products.map((e) => {
                    return (
                        <div key={e.id} className="col-3">
                            <div className="card mb-3">
                                <img className="card-img-top" src={e.images[0]} alt="Image" />
                                <div className="card-body">
                                    <h5>
                                        {e.title} - <span className="text-muted">{e.price}</span>
                                    </h5>
                                    <p>{e.description}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

Category.propTypes = {
    category: PropTypes.object,
};

export default Category;
