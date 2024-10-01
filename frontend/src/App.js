import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import LoginHome from './Pages/LoginHome';
import SearchResults from './Components/SearchResults';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/login-home" element={<LoginHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;