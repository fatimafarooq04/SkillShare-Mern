// Pages/Auth/VerifiedAlready.jsx
import React from 'react';

const VerifiedAlready = () => {
  return (
    <div className="verify-page"  style={{margin:"100px"}}>
      <h2>Email Already Verified ✅</h2>
      <p>This email address is already verified. You can log in now.</p>
      <a href="/signin">Go to Sign In</a>
    </div>
  );
};

export default VerifiedAlready;
