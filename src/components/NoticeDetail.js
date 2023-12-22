// NoticeDetail.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Nav from './Nav';
import './NoticeDetail.css';

const NoticeDetail = ({ match }) => {
  // match 객체 또는 match.params가 undefined일 경우를 방지하기 위해 optional chaining 사용
  const { id } = match?.params || {};

  // 가상의 데이터
  const dummyData = {
    id: 1,
    title: '[공지] 일부 상품의 사이즈 표기 방식 변경 예정 안내',
    content: `<p>안녕하세요. KREAM 입니다.</p><p>&ZeroWidthSpace;</p><p>&ZeroWidthSpace;&ZeroWidthSpace;​​많은 분들의 관심과 성원 덕분에 거래 물량이 예상치를 훨씬 넘어서고 있습니다.</p><p>이에 따라 최대한 작업 인력을 투입하여 검수를 진행하고 있으나, 구매후기 이벤트와 판매 수수료/구매 배송비 무료 이벤트 마감 임박 등의 여파로 한꺼번에 작업량이 몰리면서 입고 처리가 지연되고 있습니다.</p><p>&ZeroWidthSpace;</p><p><strong>[현황] 4.30 오후 2:55 업데이트 </strong></p><p>&nbsp</p><figure class="table"><table><tbody><tr><td colspan="1" rowspan="1"><strong> 입고 현황</strong></td><td colspan="1" rowspan="1"><strong> 검수 현황</strong></td><td colspan="1" rowspan="1"><strong> 거래체결-검수 결과 소요일</strong></td></tr><tr><td colspan="1" rowspan="1"> 29일 배송완료건 처리 중</td><td colspan="1" rowspan="1"> 26~27일 입고완료건 검수 중</td><td colspan="1" rowspan="1"> 평균 7영업일 소요</td></tr></tbody></table></figure><p><i>* 입고지연,구매의사 확인으로 인하여 일부 일정이 상이할 수 있습니다.</i></p><p>&ZeroWidthSpace;</p><p>매일 검수 센터 출고 마감시간은 오후 5시 입니다. </p><p>오후 5시 이후 검수 완료 건은 운송장번호는 입력되지만, 다음 영업일에 출고되어 배송이 시작됩니다.</p><p>판매자의 정산은 검수 합격일 다음 영업일에 모두 지연 없이 정산 처리되고 있습니다.</p><p>&ZeroWidthSpace;</p><p><strong>판매자가 발송하신 상품의 경우, 운송장번호와 일치하는 주문이 없는 경우 정상 입고가 불가합니다.</strong></p><p>&ZeroWidthSpace;</p><p><strong>[입고 처리 과정]</strong></p><p><strong>&ZeroWidthSpace;</strong>- 1차: 운송장번호와 일치 하는 주문 없을 시 입고 보류 처리.</p><p>- 2차: 발송하신 택배 상자의 운송장에 적혀진 정보(주문번호, 이름, 연락처)를 통해 주문검색으로 매칭을 하여 입고 처리 진행. </p><p>- 보류 : 2차까지 조회 하여 주문이 매칭되지 않은 발송건은 입고 보류</p><p>&ZeroWidthSpace;</p><p>입고 지연은 대부분 판매자의 운송장 오입력 등 부정확한 정보로 인하여 발생되며 <strong>5영업일 내 입고되지 않는 주문은 미입고로 페널티 부과 처리 됩니다.</strong></p><p>(판매자의 상품 발송시 택배 상자 겉면에 주문번호 기입해주시면, 2차 조회로 입고처리가 가능합니다.)</p><p>&ZeroWidthSpace;</p><p>입고/검수와 출고 지연에 따라 많은 분들께서 구매 후기 이벤트 참여, 판매 정산 지연 등에 대한 우려를 전달해주신 바 있습니다.</p><p>&nbsp;</p><p>이에 KREAM팀에서는 후속 조치를 준비 중이오니 여러분의 너른 양해 부탁드립니다.</p><p>&ZeroWidthSpace;</p><p>쾌적한 거래를 위해서 최선을 다하도록 하겠습니다.</p><p>감사합니다.</p><p>&ZeroWidthSpace;</p><p>KREAM팀 드림</p>`,
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
    <>
    <Header />
      <div className="container">
      <Nav />
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
          <a><Link to="/NoticeList">목록보기</Link></a>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default NoticeDetail;
