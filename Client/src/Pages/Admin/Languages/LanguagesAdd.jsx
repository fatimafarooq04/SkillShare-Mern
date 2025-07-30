import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LanguagesAdd = () => {
  const formik = useFormik({
    initialValues: {
      Language: '',
    },
    validationSchema: Yup.object({
      Language: Yup.string()
        .matches(/^[A-Za-z\s]+$/, 'Only letters and spaces are allowed')
        .min(2, 'Language must be at least 2 characters')
        .required('Language is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post('http://localhost:5000/api/language/languageAdd', {
          name: values.Language,
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
          <h3 className="card-title mb-4 text-center">Add Language</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="Language" className="form-label">Language Name</label>
              <input
                type="text"
                id="Language"
                name="Language"
                className={`form-control ${
                  formik.touched.Language && formik.errors.Language ? 'is-invalid' : ''
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Language}
              />
              {formik.touched.Language && formik.errors.Language && (
                <div className="invalid-feedback">{formik.errors.Language}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Add Language
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LanguagesAdd;
