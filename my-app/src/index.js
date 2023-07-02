/*
const express = require('express');
const session = require('express-session');
const Flickr = require('flickr-sdk');

const app = express();
const port = 3000;

// Set up session middleware
app.use(
  session({
    secret: 'your_secret_key',
    resave: false,  
    saveUninitialized: true
  })
);

// Initialize Flickr API client
const flickr = new Flickr({
  apiKey: '74b7b5c466ae19657e02c498831ee397',
  apiSecret: 'e7030b76b84780de'
});

// Redirect user to Flickr for authorization
app.get('/auth/flickr', (req, res) => {
  const oauth = flickr.OAuth.createPlugin(
    'http://localhost:3000/auth/flickr/callback' // Callback URL
  );

  flickr.request().authenticate(oauth).then(url => {
    res.redirect(url);
  }).catch(err => {
    console.error('Flickr authentication error:', err);
    res.status(500).send('Flickr authentication error');
  });
});

// Handle the callback from Flickr
app.get('/auth/flickr/callback', (req, res) => {
  const oauth = flickr.OAuth.createPlugin(
    'http://localhost:3000/auth/flickr/callback' // Callback URL
  );

  flickr.request().authenticate(oauth, req.query).then(response => {
    // Store the access token in the session or database
    req.session.accessToken = response.body.oauth_token;
    req.session.accessTokenSecret = response.body.oauth_token_secret;

    res.send('Authentication successful! You can close this window.');
  }).catch(err => {
    console.error('Flickr authentication callback error:', err);
    res.status(500).send('Flickr authentication callback error');
  });
});

// Example authenticated API route
app.get('/api/photos', (req, res) => {
  const oauth = flickr.OAuth.createPlugin(
    'your_access_token', 
    'your_access_token_secret' 
  );

  flickr.request()
    .get('https://api.flickr.com/services/rest', {
      oauth_consumer_key: 'your_api_key',
      method: 'flickr.photos.search',
      user_id: 'user_id_to_search',
      format: 'json',
      nojsoncallback: 1
    })
    .then(response => {
      res.json(response.body);
    })
    .catch(err => {
      console.error('Flickr API error:', err);
      res.status(500).send('Flickr API error');
    });
});

*/


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
