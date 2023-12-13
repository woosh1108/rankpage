// NoticeList.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import './NoticeList.css';

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 20;
  const totalItems = 250; // 백엔드에서 받아온 전체 아이템 수
  const totalPages = Math.ceil(totalItems / noticesPerPage);

  // 공지사항 더미 데이터
  const dummyNotices = Array.from({ length: totalItems }, (_, index) => ({
    id: index + 1,
    title: `Notice ${index + 1}`,
  }));

  useEffect(() => {
    const startIndex = (currentPage - 1) * noticesPerPage;
    const endIndex = startIndex + noticesPerPage;
    const currentNotices = dummyNotices.slice(startIndex, endIndex);
    setNotices(currentNotices);
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
    <div className="content">
      <div className="notice-header">
        <h3>공지사항</h3>
      </div>
      <ul className="notices-list">
        {notices.map((notice) => (
          <li key={notice.id}>{notice.title}</li>
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
  );
};

export default NoticeList;
