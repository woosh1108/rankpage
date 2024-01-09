// NoticeDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Nav from './Nav';
import './NoticeDetail.css';

const NoticeDetail = ({ match }) => {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        if (!id) {
          console.error('공지사항 ID가 유효하지 않습니다.');
          return;
        }

        const response = await fetch(`http://localhost:8080/api/notice/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data) {
          console.error('공지사항 데이터가 비어있습니다.');
          return;
        }

        setNotice(data);
      } catch (error) {
        console.error('공지사항을 가져오는 중 오류 발생:', error);
      }
    };

    // id가 null이 아닌 경우에만 fetchNotice 함수 호출
    if (id) {
      fetchNotice();
    }
  }, [id]);


  if (!notice) {
    return <div className='loading'>Loading...</div>;
  }

  // noticeDate를 Date 객체로 변환
  const date = new Date(notice.noticeDate);

  return (
    <>
    <Header />
      <div className="container">
      <Nav />
      <div className="content">
        <div className='notice-header'>
          <h3>공지사항</h3>
        </div>
        <div className='notice-info'>
          <span className='notice-date'>{date.toLocaleDateString('ko-KR')}</span>
          <p>{notice.noticeTitle}</p>
        </div>
        <div className='notice-content'>
          <div className='notice-body' dangerouslySetInnerHTML={{ __html: notice.noticeContents }}></div>
        </div>
        <div className='btn_list'>
          <a href='/NoticeList'>목록보기</a>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default NoticeDetail;
