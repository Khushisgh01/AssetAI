import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoriesSection from './components/CategoriesSection';
import HowItWorksSection from './components/HowItWorksSection';
import MarketInsightsSection from './components/MarketInsightsSection';
import AboutSection from './components/AboutSection';
import PredictionPage from './pages/PredictionPage';
import Footer from './components/Footer';

// Custom MUI dark theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#6366f1' },
    secondary: { main: '#06b6d4' },
    background: { default: '#05050f', paper: '#0d0d24' },
    text: { primary: '#e8e8f0', secondary: '#9090b0' },
  },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    h1: { fontFamily: "'Syne', sans-serif" },
    h2: { fontFamily: "'Syne', sans-serif" },
    h3: { fontFamily: "'Syne', sans-serif" },
    h4: { fontFamily: "'Syne', sans-serif" },
    h5: { fontFamily: "'Syne', sans-serif" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: '12px', textTransform: 'none', fontWeight: 500 },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '& fieldset': { borderColor: 'rgba(99,102,241,0.3)' },
            '&:hover fieldset': { borderColor: 'rgba(99,102,241,0.6)' },
            '&.Mui-focused fieldset': { borderColor: '#6366f1' },
          },
        },
      },
    },
  },
});

export default function App() {
  // activePage: 'home' | 'predict'
  const [activePage, setActivePage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handlePredictNow = (category) => {
    setSelectedCategory(category);
    setActivePage('predict');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setActivePage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar onGoHome={handleGoHome} activePage={activePage} />
      {activePage === 'home' ? (
        <>
          <HeroSection onStartPredicting={() => {
            document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
          }} />
          <CategoriesSection onPredictNow={handlePredictNow} />
          <HowItWorksSection />
          {/* <MarketInsightsSection /> */}
          <AboutSection />
          <Footer />
        </>
      ) : (
        <PredictionPage category={selectedCategory} onBack={handleGoHome} />
      )}
    </ThemeProvider>
  );
}