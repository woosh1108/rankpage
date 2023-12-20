import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from './components/Container';
import Search from './components/searchs/Search';

const App = () => {

  return (
    <Router>
      <div className="app">
      <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/main" element={<Container />} />
        </Routes>

      </div>
    </Router>
  );
};

export default App;
