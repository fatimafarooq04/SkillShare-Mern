import React, { useState } from 'react';
import './AdminNavbar.css';

const AdminNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data] = useState([
    'Admin', 'User', 'Zara', 'SkillStitch', 'Courses', 'Reports'
  ]);

  const filteredResults = data.filter(item =>
    item.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <nav className="admin-navbar">
      <div className="nav-search-container">
        <input
          type="text"
          className="nav-search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <div className="search-results">
            {filteredResults.length > 0 ? (
              filteredResults.map((item, i) => (
                <div className="result-item" key={i}>
                  {item}
                </div>
              ))
            ) : (
              <div className="result-item">No match found</div>
            )}
          </div>
        )}
      </div>

      <div className="nav-right">
        <span className="nav-icon">🔔</span>
      
        <img src="/profile.png" alt="Profile" className="profile-img" />
      </div>
    </nav>
  );
};

export default AdminNavbar;
