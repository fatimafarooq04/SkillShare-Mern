import React from 'react';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import GoogleButton from '../../Components/User/GoogleButton';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Signin = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      axios.defaults.withCredentials = true;

      const res = await axios.post(
  'http://localhost:5000/api/auth/login',
  values,
  { withCredentials: true } // 🔥 Important!
);


      // localStorage.setItem('token', res.data.token);
      // localStorage.setItem('user', JSON.stringify(res.data.user));

      navigate('/createskillgig'); // or wherever you want
    } catch (err) {
      setErrors({ api: err.response?.data?.message || 'Login failed' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center mt-5">
      <div className="row shadow rounded-4 overflow-hidden w-100" style={{ maxWidth: '900px' }}>

        {/* Left Side - Lottie */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <DotLottieReact
            src="/SigninSVG.lottie"
            loop
            autoplay
            style={{ width: '100%', maxWidth: '350px' }}
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="col-md-6 bg-white p-4 p-md-5">
          <h2 className="fw-bold mb-4">Welcome Back</h2>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting, errors }) => (
              <Form>
                {errors.api && <div className="alert alert-danger">{errors.api}</div>}

                <div className="mb-3">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="form-control rounded-pill py-2 px-3"
                  />
                  <ErrorMessage name="email" component="div" className="text-danger ms-2 mt-1" />
                </div>

                <div className="mb-4">
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="form-control rounded-pill py-2 px-3"
                  />
                  <ErrorMessage name="password" component="div" className="text-danger ms-2 mt-1" />
                </div>

                <button
                  type="submit"
                  className="w-100 d-block rounded-pill py-2 fw-semibold mb-3 text-center Button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </button>
              </Form>
            )}
          </Formik>

          {/* Divider */}
          <div className="text-center text-muted my-3">— OR —</div>

          {/* Social Buttons */}
          <div className="d-flex gap-2 mb-3">
            <GoogleButton type="signup" />
            <button className="btn btn-outline-primary w-50 d-flex align-items-center justify-content-center gap-2 rounded-pill">
              <FaFacebookF /> Facebook
            </button>
          </div>

          {/* Redirect */}
          <div className="text-center">
            <span className="text-muted">Don't have an account? </span>
            <Link to="/signup" className="text-primary fw-semibold text-decoration-none">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
