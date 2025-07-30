import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SkillsAdd = () => {
  const formik = useFormik({
    initialValues: {
      skill: '',
    },
    validationSchema: Yup.object({
      skill: Yup.string()
        .matches(/^[A-Za-z\s]+$/, 'Only letters and spaces are allowed')
        .min(2, 'Skill must be at least 2 characters')
        .required('Skill is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post('http://localhost:5000/api/skills/skillsAdd', {
          skill: values.skill,
        });

        if (res.status === 201) {
          alert(res.data.message);
          resetForm();
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message || 'Server error');
        } else {
          alert('Network error');
        }
      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow w-50">
        <div className="card-body">
          <h3 className="card-title mb-4 text-center">Add Skill</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="skill" className="form-label">Skill Name</label>
              <input
                type="text"
                id="skill"
                name="skill"
                className={`form-control ${
                  formik.touched.skill && formik.errors.skill ? 'is-invalid' : ''
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.skill}
              />
              {formik.touched.skill && formik.errors.skill && (
                <div className="invalid-feedback">{formik.errors.skill}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Add Skill
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SkillsAdd;
