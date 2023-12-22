// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // 스타일 파일 추가
import logoImg from '../logo.png';

const Header = () => {
  return (
    <header>
      <div className="top-menu">
          <small><Link to="/NoticeList">고객센터</Link></small>
          <small>마이페이지</small>
          <small>관심</small>
          <small>알림</small>
          <small>로그인</small>
      </div>
      <div className="bottom-menu">
        <div className="logo-container">
          <img src={logoImg} alt="Logo" />
        </div>
        <Link to="/">HOME</Link>
        <Link to="/style">STYLE</Link>
        <Link to="/shop">SHOP</Link>
        <Link to="/Search">SEARCH</Link>
      </div>
    </header>
  );
};

export default Header;
