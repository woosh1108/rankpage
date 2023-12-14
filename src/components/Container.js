// Container.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RankPage from './RankPage';
import Nav from './Nav';
import NoticeDetail from './NoticeDetail';
import './Container.css';
// <RankPage title="남성 신발 인기 순위" />
const Container = () => {
  return (
    <div className="container">
      <Nav/>
      <NoticeDetail/>
    </div>
  );
};

export default Container;
