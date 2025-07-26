import React, { useEffect } from 'react';
import { FaFacebookF } from 'react-icons/fa';
import axios from 'axios';

const FacebookButton = () => {

  // Load Facebook SDK
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '1256995079207634', // 🔁 Replace with your actual app ID
        cookie: true,
        xfbml: true,
        version: 'v18.0'
      });
    };

    // Load the SDK script manually
    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      document.body.appendChild(script);
    }
  }, []);

  const handleFacebookLogin = () => {
    if (!window.FB) {
      console.error("Facebook SDK not loaded.");
      return;
    }

    window.FB.login(async (response) => {
      if (response.authResponse) {
        const { accessToken, userID } = response.authResponse;

        // Fetch user profile from Facebook
        window.FB.api('/me', { fields: 'name,email,picture' }, async (userData) => {
          const userPayload = {
            accessToken,
            userID,
            name: userData.name,
            email: userData.email,
            picture: userData.picture?.data?.url
          };

          try {
            const res = await axios.post("http://localhost:5000/api/signup/facebook", userPayload);

            // Example: Redirect user based on first time or returning
            if (res.data.isFirstTime) {
              window.location.href = "/create-gig";
            } else {
              window.location.href = "/explore";
            }
          } catch (error) {
            console.error("Server error during Facebook login:", error);
            alert("Login failed. Try again.");
          }
        });
      } else {
        console.error("User cancelled or not authorized.");
        alert("Facebook login cancelled.");
      }
    }, { scope: 'email,public_profile' });
  };

  return (
    <button
      className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2 rounded-pill"
      onClick={handleFacebookLogin}
    >
      <FaFacebookF /> Facebook
    </button>
  );
};

export default FacebookButton;
