import React, { useEffect, useState } from "react";
import { popular } from "../api/products";
import Big from "./products/Big";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    popular()
      .then((res) => {
        console.log(res);
        setProducts(res[0].products);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="row">
      {products.length !== 0 && (
        <>
          <h3 className="col-12 mb-4">Popular products</h3>
          {products.map((e) => (
            <div key={e._id} className="col-3">
              <Big product={e} />
            </div>
          ))}
        </>
      )}
      {products.length === 0 && <p className="col-12">There is no any product yet.</p>}
    </div>
  );
}

export default Home;
