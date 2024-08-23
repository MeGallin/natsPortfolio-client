import { Outlet } from '@tanstack/react-router';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  return (
    <>
      <Header />
      <div id="main-container">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

export default App;
