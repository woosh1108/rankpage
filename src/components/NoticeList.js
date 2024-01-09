// NoticeList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Link 추가
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Nav from './Nav';
import './NoticeList.css';

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수를 상태로 관리

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/notice?page=${currentPage}`);
        if (!response.ok) {
          throw new Error(`Error fetching notices: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched Data:', data); // 추가된 로그
        setNotices(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };
  
    fetchNotices();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage < 1) {
      setCurrentPage(1);
    } else if (newPage > totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
  
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <span
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${i === startPage ? 'first-page' : ''} ${i === currentPage ? 'active' : ''}`}
        >
          {i}
        </span>
      );
    }
  
    return pageNumbers;
  };

  return (
    <>
    <Header />
      <div className="container">
        <Nav />
      <div className="content">
        <div className="notice-header">
          <h3>공지사항</h3>
        </div>
        <ul className="notices-list">
          {notices.map((notice) => (
            <li key={notice.noticeNo}>
              <Link to={`/NoticeDetail/${notice.noticeNo}`}>[{notice.noticeCate}] {notice.noticeTitle}</Link>
            </li>
          ))}
        </ul>
        <div className="pagination">
          <div className='prev_btn_box'>
            <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
              <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </button>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
          </div>
          {renderPageNumbers()}
          <div className='next_btn_box'>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
            <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </button>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default NoticeList;
