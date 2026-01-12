import React from "react";
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import Jobs from './pages/Jobs';
import Results from './pages/Results';
import AdmitCards from './pages/AdmitCards';
import StateJobsPage from './pages/StateJobsPage';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="App">
        <Header />
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/state/:stateId" element={<StateJobsPage />} />
            <Route path="/results" element={<Results />} />
            <Route path="/admit-cards" element={<AdmitCards />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;
