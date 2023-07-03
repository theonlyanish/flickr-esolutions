import React, { useEffect } from 'react';

const CallbackComponent = () => {
  useEffect(() => {
    // using url params for auth
    const urlParams = new URLSearchParams(window.location.search);
    const oauthToken = urlParams.get('oauth_token');
    const oauthVerifier = urlParams.get('oauth_verifier');

    fetch(`http://localhost:3000/callback?oauthToken=${oauthToken}&oauthVerifier=${oauthVerifier}`)
    .then(response => response.text())
    .then(data => {
      console.log('OAuth process completed successfully:', data);
      // Insert React DOM code here
    })
    .catch(error => {
      console.error('Error completing OAuth:', error);
    });
}, []);

return <div>Completing OAuth process...</div>;
};

export default CallbackComponent;