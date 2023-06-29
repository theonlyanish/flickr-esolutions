
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from './page/Search';
import Login from './page/Login';
import Register from './page/Register';




function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
