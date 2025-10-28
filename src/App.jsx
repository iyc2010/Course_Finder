import React, { useState } from 'react';
import CourseList from './components/CourseList';
import './App.css';

function App() {
  const [location, setLocation] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.trim()) {
      setSearchLocation(location.trim());
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Golf Course Finder</h1>
        <p className="subtitle">Find golf courses near you</p>
        
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city or location"
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {searchLocation && <CourseList location={searchLocation} />}
      </div>
    </div>
  );
}

export default App;