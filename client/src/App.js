import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";

import { AuthContext } from "./contexts/AuthContext";

import About from "./components/About";
import Home from "./components/Home";
import Categories from "./components/categories/Categories";
import Category from "./components/categories/Category";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

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
                    <Route path="/" exact component={Home} />
                    <Route path="/about" exact component={About} />
                    <Route path="/categories" exact component={Categories} />
                    <Route path="/categories/:categoryId" exact component={Category} />
                    {!user && (
                        <>
                            <Route path="/login" exact>
                                <Login />
                            </Route>
                            <Route path="/signup" exact>
                                <Signup />
                            </Route>
                        </>
                    )}
                    <Route component={Error} />
                </Switch>
            </main>
            <Footer />
        </>
    );
}

export default App;
