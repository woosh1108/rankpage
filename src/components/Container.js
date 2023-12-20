// Container.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RankPage from './RankPage';
import NoticeDetail from './NoticeDetail';
import NoticeList from './NoticeList';
import InspectionCriteria from './InspectionCriteria';
import FAQs from './FAQs';
import Search from './searchs/Search'
import './Container.css';

const Container = () => {
  return (
    <>
    <Header />
      <div className="container">
        <Routes>
          <Route path="/RankPage" element={<RankPage title="남성 신발 인기 순위" />} />
          <Route path="/NoticeList" element={<NoticeList />} />
          <Route path="/NoticeDetail" element={<NoticeDetail />} />
          <Route path="/FAQs" element={<FAQs />} />
          <Route path="/InspectionCriteria" element={<InspectionCriteria />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default Container;
