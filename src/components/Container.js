// Container.js

import React from 'react';
import RankPage from './RankPage';
import Nav from './Nav';
import Notices from './Notices';
import './Container.css';
// <RankPage title="남성 신발 인기 순위" />
const Container = () => {
  return (
    <div className="container">
      <Nav/>
      <Notices/>
    </div>
  );
};

export default Container;
