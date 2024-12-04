import { Outlet } from '@tanstack/react-router';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import BackgroundBlob from './components/common/BackgroundBlob';

function App() {
  return (
    <>
      <Header />
      <BackgroundBlob />
      <div id="main-container">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

export default App;
