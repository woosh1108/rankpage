// Footer.js
import React from 'react';
import './Footer.css'; // 스타일 파일 추가

const Footer = () => {
  return (
    <footer>
      <div className="footer-menu">
        <div className="info-menu">
          <p>이용안내</p>
          <small>검수기준</small>
          <small>이용정책</small>
          <small>페널티 정책</small>
          <small>커뮤니티 가이드라인</small>
        </div>
        <div className="support-menu">
          <p>고객지원</p>
          <small>공지사항</small>
          <small>서비스 소개</small>
          <small>스토어 안내</small>
          <small>판매자 방문접수</small>
        </div>
        <div className="contact-info">
          <p>고객센터 1588-7813</p>
          <p>운영시간 평일 10:00 - 18:00 (토∙일, 공휴일 휴무)</p>
          <p>점심시간 평일 13:00 - 14:00</p>
          <p>1:1 문의하기는 앱에서만 가능합니다.</p>
          <button>자주 묻는 질문</button>
        </div>
      </div>
      <div className="footer-links">
        <a href="/">회사소개</a>
        <a href="/">인재채용</a>
        <a href="/">제휴제안</a>
        <a href="/">이용약관</a>
        <a href="/">개인정보처리방침</a>
      </div>
      <div className="legal-info">
        <p className='business_title'>
          크림 주식회사 · 대표 김창욱
          <span className='blank'></span>
          사업자등록번호 : 570-88-01618 사업자정보확인
          <span className='blank'></span>
          통신판매업 : 제 2021-성남분당C-0093호
          <span className='blank'></span><br/>
          사업장소재지 : 경기도 성남시 분당구 분당내곡로 131 판교테크원 타워1, 8층
          <span className='blank'></span>
          호스팅 서비스 : 네이버 클라우드 ㈜
        </p>
        <p className="title">신한은행 채무지급보증 안내</p>
        <p className="description">당사는 고객님의 현금 결제 금액에 대해 신한은행과 채무지급보증 계약을 체결하여 안전거래를 보장하고 있습니다.
          <a className="link_guarantee">서비스가입 사실 확인</a></p>
        <div className="notice_area">
          <p className="notice">크림(주)는 통신판매 중개자로서 통신판매의 당사자가 아닙니다. 본 상품은 개별판매자가 등록한 상품으로 상품, 상품정보, 거래에 관한 의무와 책임은 각 판매자에게 있습니다. 단, 이용약관 및 정책, 기타 거래 체결 과정에서 고지하는 내용 등에 따라 검수하고 보증하는 내용에 대한 책임은 크림(주)에 있습니다.</p>
          <p className="copyright">© KREAM Corp.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;