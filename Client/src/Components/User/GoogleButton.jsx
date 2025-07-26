import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { FaGoogle } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleButton = ({ type = 'signup' }) => {
    const navigate = useNavigate();

   

    return (
        <button
            className="btn btn-outline-danger w-50 d-flex align-items-center justify-content-center gap-2 rounded-pill"
          >
            <FaGoogle /> Google
        </button>
    );
};

export default GoogleButton;
