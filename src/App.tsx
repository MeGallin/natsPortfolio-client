import { Outlet } from '@tanstack/react-router';
import './App.css';
import GlobalLayout from './components/common/GlobalLayout';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import BackgroundBlob from './components/common/BackgroundBlob';

function App() {
  return (
    <>
      <GlobalLayout>
        <Header />
        <BackgroundBlob />
        <div id="main-container">
          <Outlet />
        </div>
        <Footer />
      </GlobalLayout>
    </>
  );
}

export default App;
