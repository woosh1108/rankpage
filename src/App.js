import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Container from './components/Container';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div className="app">
      <Header />
        <Routes>
          <Route path="/" element={<Container />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
