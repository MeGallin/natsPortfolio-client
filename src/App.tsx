import { Outlet } from '@tanstack/react-router';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  return (
    <div id="main-container">
      <Header />
      <Outlet />

      <Footer />
    </div>
  );
}

export default App;
