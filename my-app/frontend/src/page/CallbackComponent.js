import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CallbackComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // using url params for auth
    const urlParams = new URLSearchParams(window.location.search);
    const oauthToken = urlParams.get('oauth_token');
    const oauthVerifier = urlParams.get('oauth_verifier');

    fetch(`/callback?oauthToken=${oauthToken}&oauthVerifier=${oauthVerifier}`)
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('OAuth process failed');
        }
      })
      .then(data => {
        console.log('OAuth process completed successfully:', data);
        
        setTimeout(() => {
          navigate('/home');
        }, 3000);
      })
      .catch(error => {
        console.error('Error completing OAuth:', error);
      });
  }, [navigate]);

  return <div>Completing OAuth process...</div>;
};

export default CallbackComponent;