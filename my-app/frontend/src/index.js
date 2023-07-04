
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// using browser router in app.js only
ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );


// ReactDOM.render(
//     <React.StrictMode>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={ <App /> }>
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </React.StrictMode>,
//     document.getElementById('root')
//   );

reportWebVitals();
