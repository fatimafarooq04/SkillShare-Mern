import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt, FaUsers, FaBook, FaUserTie, FaTools, FaThList,
  FaClipboardList, FaGraduationCap, FaCommentDots, FaCog
} from 'react-icons/fa';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuName) => {
    setOpenMenus((prev) => ({ ...prev, [menuName]: !prev[menuName] }));
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">IlmCircle Admin</h2>
      <nav className="sidebar-nav">
        <NavLink to="/admin" className="sidebar-link">
          <FaTachometerAlt className="sidebar-icon" /> Dashboard
        </NavLink>
        {/* SKILLS */}
        <div>
          <div className="sidebar-link" onClick={() => toggleMenu('skills')}>
            <FaTools className="sidebar-icon" /> Skills
            <span className="dropdown-icon">
              {openMenus.skills ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          {openMenus.skills && (
            <div className="submenu">
              <NavLink to="/admin/skillsadd" className="sidebar-link">Add Skill</NavLink>
              <NavLink to="/admin/skillsshow" className="sidebar-link">Show Skills</NavLink>
            </div>
          )}
        </div>
          {/* LANGUAGES */}
        <div>
          <div className="sidebar-link" onClick={() => toggleMenu('languages')}>
            <FaTools className="sidebar-icon" /> languages
            <span className="dropdown-icon">
              {openMenus.languages ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          {openMenus.languages && (
            <div className="submenu">
              <NavLink to="/admin/languageadd" className="sidebar-link">Add languages</NavLink>
              <NavLink to="/admin/languageshow" className="sidebar-link">Show languages</NavLink>
            </div>
          )}
        </div>
        {/* USERS */}
        <div>
          <div className="sidebar-link" onClick={() => toggleMenu('users')}>
            <FaUsers className="sidebar-icon" /> Users
            <span className="dropdown-icon">
              {openMenus.users ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          {openMenus.users && (
            <div className="submenu">
              <NavLink to="/admin/users/add" className="sidebar-link">Add User</NavLink>
              <NavLink to="/admin/users" className="sidebar-link">Show Users</NavLink>
            </div>
          )}
        </div>

        {/* INSTRUCTORS */}
        <div>
          <div className="sidebar-link" onClick={() => toggleMenu('instructors')}>
            <FaUserTie className="sidebar-icon" /> Instructors
            <span className="dropdown-icon">
              {openMenus.instructors ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          {openMenus.instructors && (
            <div className="submenu">
              <NavLink to="/admin/instructors/add" className="sidebar-link">Add Instructor</NavLink>
              <NavLink to="/admin/instructors" className="sidebar-link">Show Instructors</NavLink>
            </div>
          )}
        </div>

        {/* COURSES */}
        <div>
          <div className="sidebar-link" onClick={() => toggleMenu('courses')}>
            <FaBook className="sidebar-icon" /> Courses
            <span className="dropdown-icon">
              {openMenus.courses ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          {openMenus.courses && (
            <div className="submenu">
              <NavLink to="/admin/courses/add" className="sidebar-link">Add Course</NavLink>
              <NavLink to="/admin/courses" className="sidebar-link">Show Courses</NavLink>
            </div>
          )}
        </div>



        {/* CATEGORIES */}
        <div>
          <div className="sidebar-link" onClick={() => toggleMenu('categories')}>
            <FaThList className="sidebar-icon" /> Categories
            <span className="dropdown-icon">
              {openMenus.categories ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          {openMenus.categories && (
            <div className="submenu">
              <NavLink to="/admin/categories/add" className="sidebar-link">Add Category</NavLink>
              <NavLink to="/admin/categories" className="sidebar-link">Show Categories</NavLink>
            </div>
          )}
        </div>

        {/* REQUESTS */}
        <NavLink to="/admin/requests" className="sidebar-link">
          <FaClipboardList className="sidebar-icon" /> Requests
        </NavLink>

        {/* ENROLLMENTS */}
        <NavLink to="/admin/enrollments" className="sidebar-link">
          <FaGraduationCap className="sidebar-icon" /> Enrollments
        </NavLink>

        {/* FEEDBACK */}
        <NavLink to="/admin/feedback" className="sidebar-link">
          <FaCommentDots className="sidebar-icon" /> Feedback
        </NavLink>

        {/* SETTINGS */}
        <NavLink to="/admin/settings" className="sidebar-link">
          <FaCog className="sidebar-icon" /> Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
