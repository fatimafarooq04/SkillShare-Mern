import React, { useState } from 'react';
import { Container, Row, Col, Form, Badge, ProgressBar, Button } from 'react-bootstrap';
import Select from 'react-select';
import './CreateSkillGig.css'; // (optional) custom styles
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // Required for styling
import { Link, Route } from 'react-router-dom';

const skillOptions = [
  { value: 'React', label: 'React' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'MongoDB', label: 'MongoDB' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'Python', label: 'Python' },
  { value: 'Other', label: 'Other' }
];

const languageOptions = [
  { value: 'English', label: 'English' },
  { value: 'Urdu', label: 'Urdu' },
  { value: 'Punjabi', label: 'Punjabi' },
  { value: 'Pashto', label: 'Pashto' },
  { value: 'Other', label: 'Other' }
];

const CreateSkillGig = () => {
  const [teachSkills, setTeachSkills] = useState([]);
  const [learnSkills, setLearnSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [customTeach, setCustomTeach] = useState('');
  const [customLearn, setCustomLearn] = useState('');
  const [customLang, setCustomLang] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitted, setSubmitted] = useState(false); // disable form after submission
const [errors, setErrors] = useState({});



  // Calculate profile completion percentage
  const totalSteps = 4;
  const completedSteps =
    (teachSkills.length > 0 ? 1 : 0) +
    (learnSkills.length > 0 ? 1 : 0) +
    (languages.length > 0 ? 1 : 0) +
    (profileImage ? 1 : 0);
  const progress = (completedSteps / totalSteps) * 100;

  // Handle profile picture change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // Filter out selected teach skills from learn options and vice versa
  const filteredLearnOptions = skillOptions.filter(
    (option) => !teachSkills.some((skill) => skill.value === option.value)
  );
  const filteredTeachOptions = skillOptions.filter(
    (option) => !learnSkills.some((skill) => skill.value === option.value)
  );
 const handleSubmit = () => {
  const newErrors = {};

  // Validate required fields
  if (teachSkills.length === 0 && !customTeach) newErrors.teachSkills = true;
  if (learnSkills.length === 0 && !customLearn) newErrors.learnSkills = true;
  if (languages.length === 0 && !customLang) newErrors.languages = true;
  if (!profileImage) newErrors.profileImage = true;

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    return; // stop submission
  }

  const skillGigData = {
    teachSkills,
    learnSkills,
    languages,
    profileImage,
    customTeach,
    customLearn,
    customLang
  };

  console.log('Saving Skill Gig:', skillGigData);

  setShowConfirmation(true);
  setSubmitted(true); // lock the form
};


  return (
    <Container className="py-5">
      <div className="bg-white shadow-lg rounded-4 p-4 mt-5 ">
        <Row>
          {/* LEFT SIDE - Profile Image Upload */}
          <Col md={3} className="text-center mb-3">
            <h5 className="fw-semibold text-primary">👤 Profile Picture</h5>
            <p className="small text-muted">
              Click on the avatar to upload your photo. This will be shown in your public profile.
            </p>
            <div className="position-relative d-flex justify-content-center">
              <label htmlFor="upload-photo" style={{ cursor: 'pointer' }}>
                <img
                  src={profileImage || 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg'}
                  alt="Avatar"
                  className="rounded-circle border border-primary shadow"
                  width="120"
                  height="120"
                />
                <input
                  id="upload-photo"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </Col>

          {/* CENTER - Skill and Language Selection */}
          <Col md={6}>
            {/* Teach Skills Dropdown */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">🧑‍🏫 Skills You Can Teach</Form.Label>
              <Select
                options={filteredTeachOptions}
                isMulti
                placeholder="Select or add skills to teach"
                value={teachSkills}
                onChange={(selected) => setTeachSkills(selected)}
                isDisabled={submitted}
              />
              {/* If 'Other' selected, show textarea */}
              {teachSkills.some((skill) => skill.value === 'Other') && (
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

            {/* Learn Skills Dropdown */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">📚 Skills You Want to Learn</Form.Label>
              <Select
                options={filteredLearnOptions}
                isMulti
                placeholder="Select or add skills to learn"
                value={learnSkills}
                onChange={(selected) => setLearnSkills(selected)}
                isDisabled={submitted}
              />
              {/* If 'Other' selected, show textarea */}
              {learnSkills.some((skill) => skill.value === 'Other') && (
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

            {/* Language Preference */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">🌐 Preferred Languages</Form.Label>
              <Select
                options={languageOptions}
                isMulti
                placeholder="Select preferred languages"
                value={languages}
                onChange={(selected) => setLanguages(selected)}
                isDisabled={submitted}
              />
              {languages.some((lang) => lang.value === 'Other') && (
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

          {/* RIGHT SIDE - Circular Progress Display */}
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
            <Button
              variant="success"
              className="mt-4 px-4 py-2 fw-bold"
              onClick={handleSubmit}
            >
              Save & Submit
            </Button>
          </Col>
        </Row>

      </div>
      {showConfirmation && (
   <div className="mt-4">
  <div className="alert alert-info text-center fw-semibold rounded-4 shadow-sm d-flex justify-content-center align-items-center gap-2">
    <span>✅ Thanks! Your Skill Gig is under review. Please wait 24 hours to see it live on the platform.</span>
    <Link to="/explore" className="Button text-decoration-none">
      Go to Explore
    </Link>
  </div>
</div>


      )}

    </Container>
  );
};

export default CreateSkillGig;
