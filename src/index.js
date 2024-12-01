import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';  // Make sure this is imported
import App from './App';  // Import your main App component

ReactDOM.render(
  <BrowserRouter>  {/* Wrap your entire app in BrowserRouter */}
    <App />
  </BrowserRouter>,
  document.getElementById('root')  // Ensure your index.html has a div with id 'root'
);
