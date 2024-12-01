import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header-container">
      <div className="header-logo">
        <h1>Transaction Management</h1>
      </div>
      <nav className="header-nav">
        <ul className="nav-links">
            <li>
                <NavLink to="/" className="nav-link" activeClassName='active-link'>Home</NavLink>
            </li>
          <li>
            <NavLink 
              to="/api/transactions" 
              className="nav-link" 
              activeClassName="active-link">
              Create Transaction
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/api/view-transactions" 
              className="nav-link" 
              activeClassName="active-link">
              View Transactions
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
