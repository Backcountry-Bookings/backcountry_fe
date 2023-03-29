import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Results from '../Results/Results';
import Details from '../Details/Details';
import Navbar from '../Navbar/Navbar';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState({data: []})
  const [favoriteCamps, setFavoriteCamps] = useState([])

  return (
    <main className="app-main">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard setSearchResults={setSearchResults} favoriteCamps={favoriteCamps} setFavoriteCamps={setFavoriteCamps} /> } />
        <Route path="/results" element={<Results searchResults={searchResults} favoriteCamps={favoriteCamps} setFavoriteCamps={setFavoriteCamps} />} />
        {/* ADD setFavoriteCamps={setFavoriteCamps} to props below */}
        <Route path="/details/:name" element={<Details />} />
      </Routes>
    </main>
  );
}

export default App;
