//import logo from './logo.svg';
import React from 'react';
import SortingVisualizer from './main/SortingVisualizer';
import Navbar from './components/Navbar'
import './App.css';

function App() {
  return (
    <div className="App">
      <nav class="navbar">Sorting Algorithm Visualizer</nav>
      <SortingVisualizer />
    </div>
  );
}

export default App;
