// Nav.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // React Router를 사용하기 위한 import
import './Nav.css';

const Nav = () => {
  const [selectedItem, setSelectedItem] = useState(0);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <nav>
      <h1>고객센터</h1>
      <ul>
      <li className={selectedItem === 0 ? 'selected' : ''} onClick={() => handleItemClick(0)}>
          <Link to="#">공지사항</Link>
        </li>
        <li className={selectedItem === 1 ? 'selected' : ''} onClick={() => handleItemClick(1)}>
          <Link to="#">자주 묻는 질문</Link>
        </li>
        <li className={selectedItem === 2 ? 'selected' : ''} onClick={() => handleItemClick(2)}>
          <Link to="#">검수 기준</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
