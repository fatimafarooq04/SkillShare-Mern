import React from 'react';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import GoogleButton from '../../Components/User/GoogleButton';
import FacebookButton from '../../Components/User/FacebookButton';

const Signup = () => {
  const initialValues = {
    name: '',
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  });
 const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/signup', values);
    console.log('Signup response:', response.data);
    alert('Signup successful! Please verify your email.');
    resetForm();
  } catch (error) {
    console.error('Signup error:', error.response?.data || error.message);
    alert(error.response?.data?.message || 'Signup failed.');
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center mt-5">
      <div className="row shadow rounded-4 overflow-hidden w-100" style={{ maxWidth: '900px' }}>

        {/* Left Side - Animation */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <DotLottieReact
            src="/SingupSVG.lottie"
            loop
            autoplay
            style={{ width: '100%', maxWidth: '350px' }}
          />
        </div>

        {/* Right Side - Signup Form */}
        <div className="col-md-6 bg-white p-4 p-md-5">
          <h2 className="fw-bold mb-4">Create Your Account</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form method='post'>
                <div className="mb-3">
                  <Field
                    type="text"
                    name="name"
                    className="form-control rounded-pill py-2 px-3"
                    placeholder="Name"
                  />
                  <ErrorMessage name="name" component="p" className="text-danger" />
                </div>

                <div className="mb-3">
                  <Field
                    type="email"
                    name="email"
                    className="form-control rounded-pill py-2 px-3"
                    placeholder="Email"
                  />
                  <ErrorMessage name="email" component="p" className="text-danger" />
                </div>

                <div className="mb-4">
                  <Field
                    type="password"
                    name="password"
                    className="form-control rounded-pill py-2 px-3"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="p" className="text-danger" />
                </div>

                <button
                  type="submit"
                  className="Button w-100 rounded-pill py-2 fw-semibold mb-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Divider */}
          <div className="text-center text-muted my-3">— OR —</div>

          {/* Social Buttons */}
          <div className="d-flex gap-2 mb-3">
            <GoogleButton type="signup" />
            <FacebookButton />
          </div>

          {/* Sign In Redirect */}
          <div className="text-center">
            <span className="text-muted">Already have an account? </span>
            <Link to="/signin" className="text-primary fw-semibold text-decoration-none">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
