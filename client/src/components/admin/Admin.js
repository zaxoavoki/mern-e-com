import React from "react";
import { Link, Route, Switch, Redirect, useLocation, useRouteMatch } from "react-router-dom";

import Users from "./Users";
import Comments from "./Comments";
import Products from "./Products";
import Categories from "./Categories";

function Admin() {
  const { pathname } = useLocation();
  const { url } = useRouteMatch();

  const links = [
    { url, title: "Users" },
    { url: `${url}/categories`, title: "Categories" },
    { url: `${url}/products`, title: "Products" },
    { url: `${url}/comments`, title: "Comments" },
  ];

  return (
    <>
      <div className="row">
        <div className="col-3">
          <ul className="list-group">
            {links.map((link, i) => (
              <li key={i} className={`list-group-item ${link.url === pathname && "active"}`}>
                <Link to={link.url}>
                  <span className={link.url === pathname ? "text-white" : ""}>{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-9">
          <Switch>
            <Route exact path={`${url}/comments`} component={Comments} />
            <Route exact path={`${url}/products`} component={Products} />
            <Route exact path={`${url}/categories`} component={Categories} />
            <Route exact path={`${url}`} component={Users} />
            <Redirect to="/not_found" />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default Admin;
