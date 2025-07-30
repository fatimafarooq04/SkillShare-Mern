import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-circular-progressbar/dist/styles.css';

const CreateSkillGig = () => {
  const [teachSkills, setTeachSkills] = useState([]);
  const [learnSkills, setLearnSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [customTeach, setCustomTeach] = useState('');
  const [customLearn, setCustomLearn] = useState('');
  const [customLang, setCustomLang] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [skillOptions, setSkillOptions] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
// Filtered options to avoid duplication
const filteredTeachOptions = skillOptions.filter(
  (option) => !learnSkills.some((learn) => learn.value === option.value)
);

const filteredLearnOptions = skillOptions.filter(
  (option) => !teachSkills.some((teach) => teach.value === option.value)
);
  // ✅ Fetch skills & languages
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsRes, langsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/skills/skillsGet'),
          axios.get('http://localhost:5000/api/language/languagesGet')
        ]);

        setSkillOptions(
          skillsRes.data.map((s) => ({ value: s._id, label: s.skill }))
        );
        setLanguageOptions(
          langsRes.data.map((l) => ({ value: l._id, label: l.name }))
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // ✅ Progress Bar: Now only 3 steps
  const totalSteps = 3;
  const completedSteps =
    (teachSkills.length > 0 ? 1 : 0) +
    (learnSkills.length > 0 ? 1 : 0) +
    (languages.length > 0 ? 1 : 0);

  const progress = (completedSteps / totalSteps) * 100;

  // ✅ Submit Handler
  const handleSubmit = async () => {
    const newErrors = {};
    if (teachSkills.length === 0 && !customTeach) newErrors.teachSkills = true;
    if (learnSkills.length === 0 && !customLearn) newErrors.learnSkills = true;
    if (languages.length === 0 && !customLang) newErrors.languages = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const skillGigData = {
      teachSkills: teachSkills.map((s) => s.value),
      learnSkills: learnSkills.map((s) => s.value),
      languages: languages.map((l) => l.value),
      customTeach,
      customLearn,
      customLang,
    };

    console.log('Saving Skill Gig:', skillGigData);

    try {
      await axios.post('http://localhost:5000/api/skillGig/create', skillGigData);
      setShowConfirmation(true);
      setSubmitted(true);
    } catch (error) {
      console.error('Error saving skill gig:', error);
    }
  };

  return (
    <Container className="py-5">
      <div className="bg-white shadow-lg rounded-4 p-4 mt-5 ">
        <Row>
          {/* CENTER - Skills & Languages */}
          <Col md={9} className="mx-auto">
       {/* Teach Skills */}
<Form.Group className="mb-4">
  <Form.Label className="fw-bold">🧑‍🏫 Skills You Can Teach</Form.Label>
  <Select
    options={filteredTeachOptions} // 🔹 use filtered options
    isMulti
    value={teachSkills}
    onChange={setTeachSkills}
    isDisabled={submitted}
  />
  {teachSkills.some((s) => s.label === 'Other') && (
    <Form.Control
      as="textarea"
      rows={2}
      placeholder="Write your custom skills..."
      className="mt-2"
      value={customTeach}
      onChange={(e) => setCustomTeach(e.target.value)}
    />
  )}
</Form.Group>

{/* Learn Skills */}
<Form.Group className="mb-4">
  <Form.Label className="fw-bold">📚 Skills You Want to Learn</Form.Label>
  <Select
    options={filteredLearnOptions} // 🔹 use filtered options
    isMulti
    value={learnSkills}
    onChange={setLearnSkills}
    isDisabled={submitted}
  />
  {learnSkills.some((s) => s.label === 'Other') && (
    <Form.Control
      as="textarea"
      rows={2}
      placeholder="Write your custom learning goals..."
      className="mt-2"
      value={customLearn}
      onChange={(e) => setCustomLearn(e.target.value)}
    />
  )}
</Form.Group>


            {/* Languages */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">🌐 Preferred Languages</Form.Label>
              <Select
                options={languageOptions}
                isMulti
                value={languages}
                onChange={setLanguages}
                isDisabled={submitted}
              />
              {languages.some((l) => l.label === 'Other') && (
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Mention custom languages..."
                  className="mt-2"
                  value={customLang}
                  onChange={(e) => setCustomLang(e.target.value)}
                />
              )}
            </Form.Group>
          </Col>

          {/* RIGHT SIDE - Progress */}
          <Col md={3} className="text-center d-flex flex-column justify-content-center align-items-center">
            <div style={{ width: 120, height: 120 }} className="mb-4">
              <CircularProgressbar
                value={progress}
                text={`${Math.round(progress)}%`}
                styles={buildStyles({
                  pathColor: '#0d6efd',
                  textColor: '#000',
                  trailColor: '#eee',
                })}
              />
            </div>
            <p className="small text-muted">Profile Completion</p>
            <Button variant="success" className="mt-4 px-4 py-2 fw-bold" onClick={handleSubmit}>
              Save & Submit
            </Button>
          </Col>
        </Row>
      </div>

      {showConfirmation && (
        <div className="mt-4">
          <div className="alert alert-info text-center fw-semibold rounded-4 shadow-sm d-flex justify-content-center align-items-center gap-2">
            <span>✅ Thanks! Your Skill Gig is under review.</span>
            <Link to="/explore" className="btn btn-link text-decoration-none">
              Go to Explore
            </Link>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CreateSkillGig;
