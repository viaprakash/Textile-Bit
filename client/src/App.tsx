import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen fabric-bg">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontFamily: 'Poppins, sans-serif',
            fontSize: '0.875rem',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
          },
          success: {
            iconTheme: { primary: '#c86628', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#dc2626', secondary: '#fff' },
          },
        }}
      />
    </BrowserRouter>
  );
}
