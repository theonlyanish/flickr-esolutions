import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const VerifyAccessToken = () => {
    const [verificationResult, setVerificationResult] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      // Call the server-side function to verify the access token
      fetch('/access-token')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error verifying access token');
        }
      })
      .then(data => {
        setVerificationResult(data);
        navigate('/search');
      })
      .catch(error => console.error('Error verifying access token:', error));
  }, [navigate]);
  
    return (
      <div>
        {verificationResult ? (
          <div>
            <h2>Access Token Verification Result:</h2>
            <p>Username: {verificationResult.user.username._content}</p>
          </div>
        ) : (
          <p>Verifying access token...</p>
        )}
      </div>
    );
  };
  
  export default VerifyAccessToken;