// Nav.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'; // 스타일 파일 추가

const Nav = () => {
  return (
    <nav>
      <div className="top-menu">
          <small>고객센터</small>
          <small>마이페이지</small>
          <small>관심</small>
          <small>알림</small>
          <small>로그인</small>
      </div>
      <div className="bottom-menu">
        <div className="logo-container">
          <img src="path/to/logo.png" alt="Logo" />
        </div>
        <Link to="/">HOME</Link>
        <Link to="/style">STYLE</Link>
        <Link to="/shop">SHOP</Link>
        <Link to="/search">SEARCH</Link>
      </div>
    </nav>
  );
};

export default Nav;
