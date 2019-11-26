import React from 'react';
import logo from './logo.svg';
import './App.css';
import Feed from './Feed.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p> So I hear you like dogs... </p>
        <Feed
          breed="all"
        />
      </header>
    </div>
  );
}

export default App;
