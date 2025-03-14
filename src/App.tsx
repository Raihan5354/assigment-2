import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import InteractiveDemo from './components/InteractiveDemo';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome to Slovenské Vzdelávacie Centrum
          </h1>
          <InteractiveDemo />
        </div>
      </div>
    </Router>
  );
}

export default App;