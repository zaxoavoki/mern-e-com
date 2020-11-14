import React from "react";
import { Route, Link, Switch, Redirect, useRouteMatch, useLocation } from "react-router-dom";

import Security from "./Security";
import Address from "./Address";
import Profile from "./Profile";
import Saved from "./Saved";
import Bought from "./Bought";

export default function Settings() {
    const { pathname } = useLocation();
    const { url } = useRouteMatch();

    const links = [
        {
            url,
            title: "Profile information",
        },
        {
            url: `${url}/security`,
            title: "Security",
        },
        {
            url: `${url}/address`,
            title: "Address",
        },
        {
            url: `${url}/saved`,
            title: "Saved products",
        },
        {
            url: `${url}/bought`,
            title: "Bought products",
        },
    ];

    return (
        <div>
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
                        <Route exact path={`${url}/security`} component={Security} />
                        <Route exact path={`${url}/address`} component={Address} />
                        <Route exact path={`${url}/saved`} component={Saved} />
                        <Route exact path={`${url}/bought`} component={Bought} />
                        <Route exact path={`${url}`} component={Profile} />
                        <Redirect to="/not_found" />
                    </Switch>
                </div>
            </div>
        </div>
    );
}
