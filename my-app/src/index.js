import React from 'react';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ReactDOM from "react-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// render(
// <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />} />
//     </Routes>
//   </BrowserRouter>,
//   rootElement
// );
// reportWebVitals();
