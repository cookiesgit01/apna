import { Routes } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import React from 'react';
import { Link } from "react-router-dom";
import Dashboard from './dashboard';
import Product from './product';
// import Orders from './orders';

function AdminRoute() {
  return (
    <Router>
      <ul className="nav-news-feed">
        <li>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </li>
        <li>
          <Link to="/product" className="nav-link">product</Link>
        </li>
        <li>
          <Link to="/orders" className="nav-link">orders</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product" element={<Product />} />


      </Routes>
    </Router>
  );
}

export default AdminRoute;
