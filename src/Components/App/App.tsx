import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Results from '../Results/Results';
import Details from '../Details/Details';
import Navbar from '../Navbar/Navbar';
import './App.css';

// TEST FAVORITE OBJECT
const testFav = {
  "id": "7475825B-E844-4012-841B-0E29E05D4540",
  "type": "campsite_search",
  "attributes": {
      "name": "Aspenglen Campground",
      "description": "Aspenglen Campground is reservation only. Visit Recreation.gov. Aspenglen opens for the 2023 season on May 26. Timed Entry Permits are included with your camping reservation. For Aspenglen Campers, your reservation includes access to Bear Lake Road. Campers will be able to initially enter the park beginning at 1 p.m. on the first day of your camping reservation. If you plan to enter the park earlier in the day, you will have to enter the park outside of the times when Timed Entry Permits are in effect.",
      "images": [
          {
              "credit": "NPS Photo",
              "crops": [],
              "title": "Aspenglen Campground",
              "altText": "Road through pines with tent sites",
              "caption": "Aspenglen Campground is nestled in a pine forest near Fall River",
              "url": "https://www.nps.gov/common/uploads/structured_data/3FAA6E89-1DD8-B71B-0B170E56BD4ED00D.jpg"
          },
          {
              "credit": "NPS Photo",
              "crops": [],
              "title": "Campsite with popup camper and comfort station",
              "altText": "Popup camper at campsite with picnic table and comfort station",
              "caption": "A typical campsite at Aspenglen Campground.",
              "url": "https://www.nps.gov/common/uploads/structured_data/3FB3F3FE-1DD8-B71B-0B9E4BCE69676E6D.jpg"
          },
          {
              "credit": "NPS Photo",
              "crops": [],
              "title": "Aspenglen Comfort Station",
              "altText": "Comfort station set in trees",
              "caption": "A comfort station (restroom) at Aspenglen Campground.",
              "url": "https://www.nps.gov/common/uploads/structured_data/3FC22E4A-1DD8-B71B-0B1EF349ED80CF5A.jpg"
          },
          {
              "credit": "NPS Photo",
              "crops": [],
              "title": "Food Storage Locker",
              "altText": "A visitor places food in a food storage locker",
              "caption": "Use food storage lockers to protect food from bears and other wildlife.",
              "url": "https://www.nps.gov/common/uploads/structured_data/3FCBC8C3-1DD8-B71B-0BCD4A43E1924C05.jpg"
          }
      ],
      "park_code": "romo",
      "cost": [
          {
              "cost": "30.00",
              "description": "Per site per night",
              "title": "Camping Fee"
          }
      ]
  }
}

function App() {
  const [searchResults, setSearchResults] = useState({data: []})
  const [favoriteCamps, setFavoriteCamps] = useState([testFav])

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
