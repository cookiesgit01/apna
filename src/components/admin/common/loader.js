import React from "react";
import './loader.css'
import Spinner from "react-bootstrap/Spinner";
const Loader = () => {
  return (
    <div className="loader_page d-block">
      <div className="spinner">
        <Spinner animation="border" variant="success" />
      </div>
    </div>
  );
};

export default Loader;
