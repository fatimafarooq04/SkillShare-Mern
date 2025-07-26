import React, { useState } from 'react';
import './Explore.css';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

// Dummy data
const users = [
  { id: 1, name: 'Ali', language: 'English', skill: 'Web Development' },
  { id: 2, name: 'Sara', language: 'Urdu', skill: 'Graphic Design' },
  { id: 3, name: 'Ahmed', language: 'Punjabi', skill: 'Video Editing' },
  { id: 4, name: 'Zara', language: 'English', skill: 'Cooking' },
];

const languages = ['English', 'Urdu', 'Punjabi', 'Sindhi'];
const skills = ['Web Development', 'Graphic Design', 'Cooking', 'Video Editing'];

const Explore = () => {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [search, setSearch] = useState('');

  const toggleSelection = (list, setList, value) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const filteredUsers = users.filter((user) =>
    (selectedLanguages.length === 0 || selectedLanguages.includes(user.language)) &&
    (selectedSkills.length === 0 || selectedSkills.includes(user.skill)) &&
    (user.name.toLowerCase().includes(search.toLowerCase()) || user.skill.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="explore-container">
      {/* Sidebar */}
      <aside className="explore-sidebar">
        <h4>Filter by Language</h4>
        {languages.map((lang) => (
          <label key={lang}>
            <input
              type="checkbox"
              checked={selectedLanguages.includes(lang)}
              onChange={() => toggleSelection(selectedLanguages, setSelectedLanguages, lang)}
            />
            {lang}
          </label>
        ))}

        <h4 className="mt-4">Filter by Skill</h4>
        {skills.map((skill) => (
          <label key={skill}>
            <input
              type="checkbox"
              checked={selectedSkills.includes(skill)}
              onChange={() => toggleSelection(selectedSkills, setSelectedSkills, skill)}
            />
            {skill}
          </label>
        ))}
      </aside>

      {/* Main Content */}
      <main className="explore-main">
        <div className="explore-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by name or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="explore-grid">
          {filteredUsers.length === 0 ? (
            <p className="no-result">No users found. Try different filters.</p>
          ) : (
            filteredUsers.map((user, index) => (
              <motion.div
                className="explore-card"
                key={user.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="user-avatar">{user.name.charAt(0)}</div>
                <h5>{user.name}</h5>
                <p><strong>Skill:</strong> {user.skill}</p>
                <p><strong>Language:</strong> {user.language}</p>
              </motion.div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Explore;
