import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Workflow from './components/Workflow';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App bg-bgLight">
      <Navbar />
      <Hero />
      <Features />
      <Workflow />
      <Pricing />
      <Footer />
    </div>
  );
}

export default App;
