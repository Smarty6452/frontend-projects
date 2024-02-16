import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <Link to="/">
        <h2>Online Shop</h2>
      </Link>
      <Link to="/cart">
        <div className="nav-bag">
            <div className="icon">👜</div>
          <span className="bag-quant">3</span>
        </div>
      </Link>
    </nav>
  );
};

export default NavBar;
