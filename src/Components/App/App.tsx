import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Results from '../Results/Results';
import Details from '../Detail/Details';
import Navbar from '../Navbar/Navbar';
import './App.css';

function App() {
  return (
    <main className="app-main">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/results" element={<Results />} />
        <Route path="/details/:name" element={<Details />} />
      </Routes>
    </main>
  );
}

export default App;
