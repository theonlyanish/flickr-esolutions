const express = require('express');
const request = require('request');
const session = require('express-session');
const app = express();
const apiKeyy = '74b7b5c466ae19657e02c498831ee397';
const apiSecrett = 'e7030b76b84780de';


// Session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
  }));
  
  // API key refering to config.js
  
  const callbackURL = 'http://localhost:3000/callback';
  
  // Root URL
  app.get('/home', (req, res) => {
    res.send('Flickr Oauth Process');
  });
  
  
  app.get('/auth', (req, res) => {
   
    const oauthRequestTokenURL = `https://www.flickr.com/services/oauth/request_token?oauth_callback=${callbackURL}`;
    request.get({ url: oauthRequestTokenURL }, (error, response, body) => {
      if (error) {
        console.error('Error getting OAuth request token:', error);
        res.status(500).json({ error: 'Error getting OAuth request token' });
      } else {
        const oauthTokenMatch = body.match(/oauth_token=([^&]+)/);
        const oauthTokenSecretMatch = body.match(/oauth_token_secret=([^&]+)/);
  
  
        if (oauthTokenMatch && oauthTokenSecretMatch) {
          const oauthToken = oauthTokenMatch[1];
          const oauthTokenSecret = oauthTokenSecretMatch[1];
  
          // Store the oauth stuff
          req.session.oauthToken = oauthToken;
          req.session.oauthTokenSecret = oauthTokenSecret;
  
          res.json({ oauthToken });
      } else {
        console.error('Error parsing OAuth request token:', body);
        res.status(500).json({ error: 'Error parsing OAuth request token' });
      }
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

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
  });
  