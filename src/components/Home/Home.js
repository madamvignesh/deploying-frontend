import React from "react";
import { Link } from "react-router-dom"; // For navigation links
import "./Home.css"; // CSS for styling

const HomePage = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Transaction Management System</h1>
      <p className="home-subtitle">Welcome! What would you like to do?</p>
      
      <div className="home-links">
        <Link to="/api/transactions" className="home-link">
          Create a Transaction
        </Link>
        <Link to="/api/view-transactions" className="home-link">
          View Transactions
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
