import React, { useEffect } from 'react';
import './OAuthComponent.css';

const OAuthComponent = () => {

  useEffect(() => {
    window.location.href = 'http://localhost:3000/auth';
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