import React from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthComponent = () => {
    const navigate = useNavigate();

  const initiateOAuth = () => {
    fetch('http://localhost:3000/auth')
      .then(response => response.json())
      .then(data => {
        navigate('/callback');
      })
      .catch(error => {
        console.error('Error initiating OAuth:', error);
      });
  };
    return (
      <div>
        <h2>OAuth Component</h2>
        <button onClick={initiateOAuth}>Initiate OAuth</button>
      </div>
    );
  }

export default OAuthComponent;
