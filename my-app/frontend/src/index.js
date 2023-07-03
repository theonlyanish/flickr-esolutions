
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
<React.StrictMode>
<BrowserRouter>
<Routes>
<Route path="/" element={<App />} />
</Routes>
</BrowserRouter>
</React.StrictMode>,
document.getElementById('root')
);

reportWebVitals();

// render(
// <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />} />
//     </Routes>
//   </BrowserRouter>,
//   rootElement
// );
// reportWebVitals();