import React from 'react';
import axios from 'axios';

const App = () => {
  // Function to initiate the OAuth flow
  const handleOAuth = async () => {
    try {
      // Make a GET request to the backend server's OAuth route
      const response = await axios.get('http://localhost:3000/auth/flickr');
      
      // Redirect the user to the Flickr authorization page
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.error('OAuth error:', error);
      // Handle error
    }
  };

  // Function to make an authenticated API request
  const fetchPhotos = async () => {
    try {
      // Make a GET request to the backend server's API route
      const response = await axios.get('http://localhost:3000/api/photos');
      console.log(response.data);
      // Handle the response
    } catch (error) {
      console.error('API request error:', error);
      // Handle error
    }
  };

  return (
    <div>
      <button onClick={handleOAuth}>Authorize with Flickr</button>
      <button onClick={fetchPhotos}>Fetch Photos</button>
    </div>
  );
};

export default App;

/*
import React, { useState } from 'react';
import Login from './page/Login';
import Search from './page/Search';
import { apiKey } from './config/config';
import './App.css';

const App = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (email, password) => {
    // Implement your login logic here
    // You can use the provided email and password to authenticate the user and obtain the API key
    // For simplicity, this example considers the user as logged in if email and password are non-empty
    if (email !== '' && password !== '') {
      // Simulating the API key retrieval from the backend
      setIsLoggedIn(true);
    }
  };

  return (
      <div class="two minimal">
    <h1>Flickr Image Search
      <span>Search through Flickr</span>
    </h1>
    {isLoggedIn ? (
        <Search apiKey={apiKey} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
  </div>
  );
};

export default App;










/*
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Search from './page/Search';
import Login from './page/Login';
//import Register from './page/Register';




function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
            
            <Route path="*" element={<Login />} />
  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
*/

