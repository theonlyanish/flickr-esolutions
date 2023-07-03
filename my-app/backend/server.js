const express = require('express');
const request = require('request');
const session = require('express-session');
const { apiKey } = require('./config/config');
const { apiSecret} = require('./config/config')
const app = express();
const apiKeyy = apiKey
const apiSecrett = apiSecret


// Session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
  }));
  
  // API key refering to config.js
  
  const callbackURL = 'http://localhost:3001/callback';
  
  // Root URL
  app.get('/', (req, res) => {
    res.send('Flickr Oauth Process');
  });
  
  
  app.get('/auth', (req, res) => {
    // Generate the OAuth request token URL
    const oauthRequestTokenURL = `https://www.flickr.com/services/oauth/request_token?oauth_callback=${callbackURL}`;
    request.get({ url: oauthRequestTokenURL }, (error, response, body) => {
      if (error) {
        console.error('Error getting OAuth request token:', error);
        res.status(500).send('Error getting OAuth request token');
      } else {
        const oauthToken = body.match(/oauth_token=([^&]+)/)[1];
        const oauthTokenSecret = body.match(/oauth_token_secret=([^&]+)/)[1];
  
        // Store the oauth stuff
        req.session.oauthToken = oauthToken;
        req.session.oauthTokenSecret = oauthTokenSecret;
  
        res.redirect(`https://www.flickr.com/services/oauth/authorize?oauth_token=${oauthToken}`);
      }
    });
  });
  
  // using ccallback to handle oauth
  app.get('/callback', (req, res) => {
    const oauthToken = req.query.oauth_token;
    const oauthVerifier = req.query.oauth_verifier;
    const oauthTokenSecret = req.session.oauthTokenSecret;
  
    const oauthAccessTokenURL = `https://www.flickr.com/services/oauth/access_token`;
  
    // Request token
    request.post({
      url: oauthAccessTokenURL,
      oauth: {
        consumer_key: apiKeyy,
        consumer_secret: apiSecrett,
        token: oauthToken,
        token_secret: oauthTokenSecret,
        verifier: oauthVerifier
      }
    }, (error, response, body) => {
      if (error) {
        console.error('Error getting OAuth access token:', error);
        res.status(500).send('Error getting OAuth access token');
      } else {
        const oauthAccessToken = body.match(/oauth_token=([^&]+)/)[1];
        const oauthAccessTokenSecret = body.match(/oauth_token_secret=([^&]+)/)[1];
  
      
        req.session.oauthAccessToken = oauthAccessToken;
        req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;

        // Route to react side now
      res.send('OAuth process completed successfully!');
    }
});
});  

app.listen(3001, () => {
    console.log('Server started on http://localhost:3001');
  });
  