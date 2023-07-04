import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import OAuthComponent from './page/OAuthComponent';
import CallbackComponent from './page/CallbackComponent';
import AccessComponent from './page/AccessComponent';
import Search from './page/Search';
import { apiKey } from './config/config';
import { BrowserRouter } from 'react-router-dom';

//Setting header for all
function App() {
  return (
  
  <div className="two minimal">
  <h1>
  Flickr Image Search
  <span>Search through Flickr</span>
  </h1>

  <Routes>
        <Route path="/" element={<OAuthComponent />} />
        <Route path="/search" element={<Search apiKey={apiKey} />} />
        <Route path="/callback" element={<CallbackComponent />} />
        <Route path="/access" element={<AccessComponent />} />
      </Routes>
  </div>
  );
  }
  
  export default App;