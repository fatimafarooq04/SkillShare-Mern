import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const SkillsShow = () => {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [editSkill, setEditSkill] = useState(null); // store skill for editing
  const [newSkillName, setNewSkillName] = useState("");

  // ✅ Fetch skills from backend
  const fetchSkills = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/skills/skillsGet");
      setSkills(res.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // ✅ Delete Skill
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await axios.delete(`http://localhost:5000/api/skills/${id}`);
        fetchSkills(); // refresh list
      } catch (error) {
        console.error("Error deleting skill:", error);
      }
    }
  };

  // ✅ Open Update Modal
  const handleUpdate = (skill) => {
    setEditSkill(skill);
    setNewSkillName(skill.skill);
  };

  // ✅ Submit Update
  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/skills/${editSkill._id}`, {
        skill: newSkillName,
      });
      setEditSkill(null);
      fetchSkills(); // refresh list
    } catch (error) {
      console.error("Error updating skill:", error);
    }
  };

  // Filter skills based on search input
  const filteredSkills = skills.filter((s) =>
    s.skill.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-md-8">
        <h2 className="text-center mb-4">Skills List</h2>

        {/* Search Bar */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Skills Table */}
        <table className="table table-bordered table-striped text-center shadow">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Skill</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSkills.length > 0 ? (
              filteredSkills.map((s, index) => (
                <tr key={s._id}>
                  <td>{index + 1}</td>
                  <td>{s.skill}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleUpdate(s)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(s._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No skills found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {editSkill && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Skill</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditSkill(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditSkill(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleUpdateSubmit}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsShow;
