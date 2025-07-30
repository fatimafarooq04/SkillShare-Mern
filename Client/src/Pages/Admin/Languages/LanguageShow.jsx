import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const LanguageShow = () => {
  const [languages, setLanguages] = useState([]);
  const [search, setSearch] = useState("");
  const [editLanguage, setEditLanguage] = useState(null); // store language for editing
  const [newLanguageName, setNewLanguageName] = useState("");

  // ✅ Fetch languages from backend
  const fetchLanguages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/language/languagesGet");
      setLanguages(res.data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  // ✅ Delete Language
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this language?")) {
      try {
        await axios.delete(`http://localhost:5000/api/language/${id}`);
        fetchLanguages(); // refresh list
      } catch (error) {
        console.error("Error deleting language:", error);
      }
    }
  };

  // ✅ Open Update Modal
  const handleUpdate = (lang) => {
    setEditLanguage(lang);
    setNewLanguageName(lang.name);
  };

  // ✅ Submit Update
  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/language/${editLanguage._id}`, {
        name: newLanguageName,
      });
      setEditLanguage(null);
      fetchLanguages(); // refresh list
    } catch (error) {
      console.error("Error updating language:", error);
    }
  };

  // Filter languages based on search input
  const filteredLanguages = languages.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-md-8">
        <h2 className="text-center mb-4">Languages List</h2>

        {/* Search Bar */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search languages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Languages Table */}
        <table className="table table-bordered table-striped text-center shadow">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Language</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((l, index) => (
                <tr key={l._id}>
                  <td>{index + 1}</td>
                  <td>{l.name}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleUpdate(l)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(l._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No languages found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {editLanguage && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Language</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditLanguage(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={newLanguageName}
                  onChange={(e) => setNewLanguageName(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditLanguage(null)}
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

export default LanguageShow;
