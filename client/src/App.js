import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";

import { AuthContext } from "./contexts/AuthContext";

import About from "./components/About";
import Home from "./components/Home";
import Categories from "./components/categories/Categories";
import Category from "./components/categories/Category";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

import Admin from "./components/admin/Admin";
import Settings from "./components/settings/Settings";

import Error from "./components/layout/Error";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
    const { user } = useContext(AuthContext);
    return (
        <>
            <Header />
            <main className="container py-5">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/admin" component={Admin} />
                    <Route exact path="/categories" component={Categories} />
                    <Route exact path="/categories/:categoryId" component={Category} />

                    {user && <Route path="/settings" component={Settings} />}
                    {!user && <Route exact path="/login" component={Login} />}
                    {!user && <Route exact path="/signup" component={Signup} />}

                    <Route component={Error} />
                </Switch>
            </main>
            <Footer />
        </>
    );
}

export default App;
