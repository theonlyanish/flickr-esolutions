import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OAuthComponent.css';

const OAuthComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.location.href = '/auth';
  }, []);



  return (
    <div className="container">
      <div className="box">
        <h3>OAuth - Authenticate through Flickr</h3>
        <p>Initiating OAuth process...</p>
      </div>
    </div>
  );
};

export default OAuthComponent;