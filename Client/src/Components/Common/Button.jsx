import React from "react";
import { Link } from "react-router-dom";
import "./Button.css"; 

const Button = ({ to, onClick, children, type = "button", className = "" }) => {
  if (to) {
    return (
      <Link to={to} className={`btn custom-btn ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type={type} className={`btn custom-btn ${className}`}>
      {children}
    </button>
  );
};

export default Button;
