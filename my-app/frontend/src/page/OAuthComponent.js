import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OAuthComponent.css';

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
<div class="container">
    <div class="box">
      <h3>OAuth - Authenticate through Flickr</h3>
      <button class="oauth-button"  onClick={initiateOAuth}>Initiate OAuth</button>
    </div>
  </div>
    );
  }

export default OAuthComponent;
