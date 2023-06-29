import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from './page/Search';



function App() {
  return (
    <div className="App">
 <BrowserRouter>
        <Routes>
            <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
