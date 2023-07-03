const { URLSearchParams } = require('url');
const express = require('express');
const request = require('request');
const session = require('express-session');
const app = express();
const apiKeyy = '74b7b5c466ae19657e02c498831ee397';
const apiSecrett = 'e7030b76b84780de';
const crypto = require('crypto');


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
  

  // auth signature function

  function createOAuthSignature(method, url, params, secret) {
    const baseString = `${method}&${encodeURIComponent(url)}&${encodeURIComponent(formatParams(params))}`;
    const signingKey = `${encodeURIComponent(secret)}&`;
  
    return crypto
      .createHmac('sha1', signingKey)
      .update(baseString)
      .digest('base64');
  }

  //format params

  function formatParams(params) {
    const sortedParams = {};
    Object.keys(params)
      .sort()
      .forEach(key => {
        sortedParams[key] = params[key];
      });
  
    const paramPairs = [];
    for (const [key, value] of Object.entries(sortedParams)) {
      paramPairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  
    return paramPairs.join('&');
  }
  
  // using flickr signature for logging in
  app.get('/auth', (req, res) => {
    const oauthNonce = Math.floor(Math.random() * 1e9).toString();
    const oauthTimestamp = Math.floor(Date.now() / 1000).toString();

    const oauthRequestTokenURL = `https://www.flickr.com/services/oauth/request_token`;
    const oauthCallback = encodeURIComponent(callbackURL);
    const oauthConsumerKey = apiKeyy;
    const oauthSignatureMethod = 'HMAC-SHA1';
    const oauthVersion = '1.0';
  
    const oauthSignature = createOAuthSignature(
      'GET',
      oauthRequestTokenURL,
      {
        oauth_nonce: oauthNonce,
        oauth_timestamp: oauthTimestamp,
        oauth_consumer_key: oauthConsumerKey,
        oauth_signature_method: oauthSignatureMethod,
        oauth_version: oauthVersion,
        oauth_callback: oauthCallback
      },
      apiSecrett
    );
  
    const oauthRequestTokenParams = new URLSearchParams();
    oauthRequestTokenParams.append('oauth_nonce', oauthNonce);
    oauthRequestTokenParams.append('oauth_timestamp', oauthTimestamp);
    oauthRequestTokenParams.append('oauth_consumer_key', oauthConsumerKey);
    oauthRequestTokenParams.append('oauth_signature_method', oauthSignatureMethod);
    oauthRequestTokenParams.append('oauth_version', oauthVersion);
    oauthRequestTokenParams.append('oauth_callback', oauthCallback);
    oauthRequestTokenParams.append('oauth_signature', oauthSignature);
  
    const oauthRequestTokenURLWithParams = `${oauthRequestTokenURL}?${oauthRequestTokenParams}`;
  
    request.get({ url: oauthRequestTokenURLWithParams }, (error, response, body) => {
      if (error) {
        console.error('Error getting OAuth request token:', error);
        res.status(500).json({ error: 'Error getting OAuth request token' });
      } else {
        const queryParams = new URLSearchParams(body);
        const oauthToken = queryParams.get('oauth_token');
        const oauthTokenSecret = queryParams.get('oauth_token_secret');
  
        if (oauthToken && oauthTokenSecret) {
          req.session.oauthToken = oauthToken;
          req.session.oauthTokenSecret = oauthTokenSecret;

          const redirectURL = `https://www.flickr.com/services/oauth/authorize?oauth_token=${oauthToken}`;
          res.redirect(redirectURL);
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
  

    const oauthNonce = Math.floor(Math.random() * 1e9).toString();
    const oauthTimestamp = Math.floor(Date.now() / 1000).toString();
    const oauthConsumerKey = '74b7b5c466ae19657e02c498831ee397';
    const oauthSignatureMethod = 'HMAC-SHA1';
    const oauthVersion = '1.0';

    const oauthSignature = createOAuthSignature(
      'POST',
      oauthAccessTokenURL,
      {
        oauth_nonce: oauthNonce,
        oauth_timestamp: oauthTimestamp,
        oauth_consumer_key: oauthConsumerKey,
        oauth_signature_method: oauthSignatureMethod,
        oauth_version: oauthVersion,
        oauth_token: oauthToken,
        oauth_verifier: oauthVerifier
      },
      apiSecrett,
      oauthTokenSecret
    );
  
    const oauthAccessTokenParams = {
      oauth_nonce: oauthNonce,
      oauth_timestamp: oauthTimestamp,
      oauth_consumer_key: oauthConsumerKey,
      oauth_signature_method: oauthSignatureMethod,
      oauth_version: oauthVersion,
      oauth_token: oauthToken,
      oauth_verifier: oauthVerifier,
      oauth_signature: oauthSignature
    };
  
    request.post(
      {
        url: oauthAccessTokenURL,
        oauth: oauthAccessTokenParams
      },
      (error, response, body) => {
        if (error) {
          console.error('Error getting OAuth access token:', error);
          res.status(500).send('Error getting OAuth access token');
        } else {
          const queryParams = new URLSearchParams(body);
          const oauthAccessToken = queryParams.get('oauth_token');
          const oauthAccessTokenSecret = queryParams.get('oauth_token_secret');
  
          req.session.oauthAccessToken = oauthAccessToken;
          req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
  
          res.send('OAuth callback completed successfully!');
        }
      }
    );
  });

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
  });
  