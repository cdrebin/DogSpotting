import React from 'react';
import './App.css';
import Feed from './Feed.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title"> Welcome to DogSpotting </h1>
        <p className="subtitle"> Select a Breed</p>
        <Feed
          breed="all breeds"
        />
      </header>
    </div>
  );
}

export default App;
