// Nav.js

import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // React Router를 사용하기 위한 import
import './Nav.css';

const Nav = () => {
  // 현재 경로를 가져오는 Hook
  const location = useLocation();
  
  // 현재 경로에서 선택된 항목을 추출
  const selectedItemFromPath = location.pathname.split('/')[1];

  return (
    <nav>
      <h1>고객센터</h1>
      <ul>
        <li className={selectedItemFromPath === 'NoticeList' || selectedItemFromPath === 'NoticeDetail' ? 'selected' : ''}>
          <Link to="/NoticeList">공지사항</Link>
        </li>
        <li className={selectedItemFromPath === 'FAQs' ? 'selected' : ''}>
          <Link to="/FAQs">자주 묻는 질문</Link>
        </li>
        <li className={selectedItemFromPath === 'InspectionCriteria' ? 'selected' : ''}>
          <Link to="/InspectionCriteria">검수 기준</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
