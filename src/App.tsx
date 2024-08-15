import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  return (
    <div id="main-container">
      <Header />
      <h1>Home</h1>
      <Footer />
    </div>
  );
}

export default App;
