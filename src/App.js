import React from 'react';
import SortingVisualizer from './main/SortingVisualizer';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <a href="/" style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none', fontWeight: 'bold' }}>
          Sorting Algorithm Visualizer
        </a>
      </nav>
      <SortingVisualizer />
    </div>
  );
}

export default App;
