import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import Small from "../products/Small";

export default function Saved() {
    const { jwt } = useContext(AuthContext);
    const [saved, setSaved] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/users/saved", {
            headers: {
                Authorization: jwt,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setSaved(res);
            });
    }, []);

    return (
        <div className="row">
            <div className="col-12 mb-3">
                {saved.map((product, i) => (
                    <Small key={i} product={product} />
                ))}
            </div>
        </div>
    );
}
