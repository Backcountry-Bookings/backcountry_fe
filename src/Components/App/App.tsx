import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Results from '../Results/Results';
import Details from '../Details/Details';
import Navbar from '../Navbar/Navbar';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState({data: []})

  return (
    <main className="app-main">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard setSearchResults={setSearchResults} /> } />
        <Route path="/results" element={<Results searchResults={searchResults} />} />
        <Route path="/details/:name" element={<Details />} />
      </Routes>
    </main>
  );
}

export default App;
