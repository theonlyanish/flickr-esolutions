import React from 'react';

class CallbackComponent extends React.Component {
  componentDidMount() {
    // using url params for auth
    const urlParams = new URLSearchParams(window.location.search);
    const oauthToken = urlParams.get('oauth_token');
    const oauthVerifier = urlParams.get('oauth_verifier');

    fetch('http://localhost:3000/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        oauthToken,
        oauthVerifier
      })
    })
      .then(response => response.text())
      .then(data => {
        console.log('OAuth process completed successfully:', data);
        //insert react dom here
      })
      .catch(error => {
        console.error('Error completing OAuth:', error);
      });
  }

  render() {
    return <div>Completing OAuth process...</div>;
  }
}

export default CallbackComponent;
