import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import Small from "../products/Small";

export default function Bought() {
    const { jwt } = useContext(AuthContext);
    const products = [];

    useEffect(() => {
        fetch("http://localhost:3001/users/bought", {
            headers: {
                Authorization: jwt,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                // TODO: Handle it
            });
    }, []);

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
