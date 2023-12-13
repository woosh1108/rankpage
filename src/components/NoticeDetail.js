// NoticeDetail.js

import React, { useState, useEffect } from 'react';
import './NoticeDetail.css';

const NoticeDetail = ({ match }) => {
  // match 객체 또는 match.params가 undefined일 경우를 방지하기 위해 optional chaining 사용
  const { id } = match?.params || {};

  // 가상의 데이터
  const dummyData = {
    id: 1,
    title: '[이벤트 발표] SURPRISE DRAW T1 유니폼',
    content: '안녕하세요. KREAM 입니다. <br/>11/30(목) ~ 12/4(월) 진행된 SURPRISE DRAW T1 유니폼 안내 드립니다.',
    createdAt: '2023-12-05', // 예시 날짜 데이터
  };

  const [notice, setNotice] = useState(null);

  useEffect(() => {
    // 여기에서 서버에서 공지사항 데이터를 가져오는 비동기 작업을 수행합니다.
    // 예시로 가상의 데이터를 사용하고 있습니다.
    setTimeout(() => {
      setNotice(dummyData);
    }, 1000); // 1초의 가상의 로딩 시간 추가
  }, [id]);

  if (!notice) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content">
      <div className='notice-header'>
        <h3>공지사항</h3>
      </div>
      <div className='notice-info'>
        <span className='notice-date'>{notice.createdAt}</span>
        <p>{notice.title}</p>
      </div>
      <div className='notice-content'>
        <div className='notice-body' dangerouslySetInnerHTML={{ __html: notice.content }}></div>
      </div>
      <div className='btn_list'>
        <a>목록보기</a>
      </div>
    </div>
  );
};

export default NoticeDetail;
