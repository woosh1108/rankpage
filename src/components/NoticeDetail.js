// NoticeDetail.js

import React, { useState, useEffect } from 'react';
import './NoticeDetail.css';

const NoticeDetail = ({ match }) => {
  // match 객체 또는 match.params가 undefined일 경우를 방지하기 위해 optional chaining 사용
  const { id } = match?.params || {};

  // 가상의 데이터
  const dummyData = {
    id: 1,
    title: '[공지] 일부 상품의 사이즈 표기 방식 변경 예정 안내',
    content: `<p>안녕하세요. KREAM 입니다. </p><br/>
    <p>일부 상품에 대하여 정확한 거래를 위해 사이즈 표기 방식을 제조사 공식 홈페이지 기준으로 아래와 같이 볂경할 예정입니다.</p>
    <p>해당 표기 방식 변경에 따라 일부 판매/구매 입장이 조기 만료될 수 있습니다. 관련하여 입찰하신 고객님께 개별 안내를 드리겠습니다.</p>
    <br/><p><b>Nike Air Presto</b></p>
    <ul><li>240-250(3XS)</li><li>250-260(XXS)</li><li>260-270(XS)</li><li>270-280(S)</li><li>280-290(M)</li><li>290-300(L)</li><li>300-310(XL)</li><li>310-320(XXL)</li><li>320-330(3XL)</li><ul>
    <br/><p><b>Nike Air Presto</b></p>
    <ul><li>240-250(3XS)</li><li>250-260(XXS)</li><li>260-270(XS)</li><li>270-280(S)</li><li>280-290(M)</li><li>290-300(L)</li><li>300-310(XL)</li><li>310-320(XXL)</li><li>320-330(3XL)</li><ul>
    `,
    createdAt: '2020-04-10', // 예시 날짜 데이터
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
