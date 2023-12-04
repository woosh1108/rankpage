import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Container from './components/Container';
import Footer from './components/Footer';
//import './App.css'; // 스타일 파일을 적용하려면 파일이름에 따라 수정해주세요.

const App = () => {
  return (
    <Router>
      <div className="app">
        <Nav />
        <Routes>
          <Route path="/" element={<Container />} />
         {/* 다른 라우트에 대한 설정 추가 */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
