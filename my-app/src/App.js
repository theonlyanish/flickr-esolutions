
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
