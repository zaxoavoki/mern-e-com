import React, { useEffect, useState } from "react";
import { getAll } from "../api/products";
import Big from "./products/Big";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAll("lowest_price")
      .then((res) => {
        setProducts(res);
      })
      .catch(() => {});
  }, []);

  function fetchData(query) {
    getAll(query)
      .then((res) => setProducts(res))
      .catch(() => {});
  }

  return (
    <div className="row">
      <div className="col-12 row mb-3">
        <div className="col-3">
          <label htmlFor="sort">Sort by</label>
          <select className="form-control" id="sort" onChange={(e) => fetchData(e.target.value)}>
            <option value="lowest_price">Lowest price</option>
            <option value="highest_price">Highest price</option>
            <option value="most_rated">Most rated</option>
            <option value="most_popular">Most popular</option>
            <option value="less_popular">Less popular</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {products.length !== 0 &&
        products.map((e) => (
          <div key={e._id} className="col-3">
            <Big product={e} />
          </div>
        ))}
      {products.length === 0 && <p className="col-12">There is no any product yet.</p>}
    </div>
  );
}

export default Home;
