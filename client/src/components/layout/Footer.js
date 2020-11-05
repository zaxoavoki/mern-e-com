import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <div className="container py-4  border-top">
                <div className="text-center text-muted">
                    <p className="mb-0">E-com &copy; 2020</p>
                    <Link to="/about">
                        <span className="nav-link">About</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
