import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBell, FaEnvelope, FaChevronDown } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import "./Header.css";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const isLoggedIn = false; // static for now
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top 
  ${(scrolled || !isHome) ? "bg-dark shadow-sm" : "bg-transparent"} 
  navbar-dark px-4 transition-navbar`}>
      <div className="container-fluid">

        {/* Left: Logo + Explore */}
        <div className="d-flex align-items-center gap-3">
          <Link className="navbar-brand fw-bold fs-4" to="/">SkillStitch</Link>
          <Link to="/explore" className="nav-link text-white fw-medium">Explore</Link>
        </div>

        {/* Toggle (mobile) */}
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
          <span className="navbar-toggler-icon" />
        </button>

        {/* Middle + Right Side */}
        <div className="collapse navbar-collapse" id="mainNavbar">

          {/* Center: Search */}
          <div className="search-wrapper ms-lg-4 me-auto mt-3 mt-lg-0">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search skills..."
              className="form-control search-input rounded-pill"
            />
          </div>

          {/* Right: Actions */}
          <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
            {isLoggedIn ? (
              <>
                <li className="nav-item"><FaBell className="icon-btn" /></li>
                <li className="nav-item"><FaEnvelope className="icon-btn" /></li>

                {/* Avatar with click dropdown */}
                <li className="nav-item position-relative" ref={dropdownRef}>
                  <div className="d-flex align-items-center gap-1 avatar-dropdown-toggle" onClick={() => setShowDropdown(!showDropdown)}>
                    <img src="/user-avatar.jpg" alt="avatar" className="avatar-img" />
                    <FaChevronDown className="text-white" style={{ fontSize: "0.8rem" }} />
                  </div>
                  {showDropdown && (
                    <div className="dropdown-menu-avatar show">
                      <Link to="/profile">My Profile</Link>
                      <Link to="/messages">Messages</Link>
                      <Link to="/settings">Settings</Link>
                      <Link to="/logout">Logout</Link>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link text-decoration-none" to="/signin">Login</Link></li>
                <li className="nav-item"><Link className="Button text-decoration-none" to="/signup">Signup</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
