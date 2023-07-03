import React from 'react';

class OAuthComponent extends React.Component {
  componentDidMount() {

    fetch('http://localhost:3000/auth')
      .then(response => response.json())
      .then(data => {
        
        window.location.href = data.authorizationUrl;
      })
      .catch(error => {
        console.error('Error initiating OAuth:', error);
      });
  }

  render() {
    return <div>Redirecting for OAuth...</div>;
  }
}

export default OAuthComponent;