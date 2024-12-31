import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <header className="header-container">
      <div className="header-logo">
        <h1>Transaction Management</h1>
      </div>
      <div 
        className={`menu-card ${menuActive ? "active" : ""}`} 
        onClick={toggleMenu}
      >
        Menu
      </div>
      <nav className={`header-nav ${menuActive ? "active" : ""}`}>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className="nav-link" activeClassName="active-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/api/transactions"
              className="nav-link"
              activeClassName="active-link"
            >
              Create Transaction
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/api/view-transactions"
              className="nav-link"
              activeClassName="active-link"
            >
              View Transactions
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
