import React from "react";
import faker from "faker";

import Small from "../products/Small";

export default function Bought() {
    const products = Array.from({ length: Math.round(Math.random() * 10) }, () => {
        return {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
        };
    });

    return (
        <div className="row">
            <div className="col-12 mb-3">
                {products.map((product, i) => (
                    <Small key={i} product={product} links={true} />
                ))}
            </div>
        </div>
    );
}
