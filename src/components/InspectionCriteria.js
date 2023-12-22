// InspectionCriteria.js
// 검수 기준

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Nav from './Nav';
import './InspectionCriteria.css';

// 선택된 셀의 내용에 HTML 적용을 위한 함수
const createMarkup = (htmlContent) => {
  return { __html: htmlContent };
};

const InspectionCriteria = () => {
  // 각 칸의 내용
  const gridContents = [
    '신발',
    '아우터 · 상의 · 하의',
    '가방 · 시계 · 지갑 · 패션잡화',
    '테크',
    '뷰티 · 컬렉터블 · 캠핑 · 가구/리빙',
    '프리미엄 시계',
    '프리미엄 가방',
  ];

  // 칸을 클릭하면 보여질 내용을 관리하는 상태
  const [selectedContent, setSelectedContent] = useState(gridContents[0]);

  // 선택된 셀에 따라 표시할 내용을 관리하는 상태
  const [selectedContentDetails, setSelectedContentDetails] = useState({
    '신발': `<p><b>[업데이트] 2021/11/29 월</b></p>
    <p><b>[적용일시] 2021/12/03 금 00:00 체결 건 부터</b></p><br/>    
    <p>KREAM의 검수기준은 거래 당사자간 원활한 거래와 보다 균형있는 검수기준 확립을 위해 지속적으로 업데이트 되고 있습니다. 거래에 앞서 최신 검수기준을 참고하시기 바랍니다.</p><br/>
    <p>회원님께서 판매 또는 구매하신 모든 상품은 KREAM의 전문 검수팀이 제품의 컨디션을 꼼꼼하게 확인한 후, 검수 합격 시에만 출고하고 있습니다.</p>`,
    '아우터 · 상의 · 하의': '아우터 · 상의 · 하의에 대한 내용',
    '가방 · 시계 · 지갑 · 패션잡화': '가방 · 시계 · 지갑 · 패션잡화에 대한 내용',
    '테크': '테크에 대한 내용',
    '뷰티 · 컬렉터블 · 캠핑 · 가구/리빙': '뷰티 · 컬렉터블 · 캠핑 · 가구/리빙에 대한 내용',
    '프리미엄 시계': '프리미엄 시계에 대한 내용',
    '프리미엄 가방': '프리미엄 가방에 대한 내용',
  });

  // 칸을 클릭했을 때 해당 내용을 설정하는 함수
  const handleCellClick = (content) => {
    // a 태그 내용이 없으면 선택 불가능
    if (!content) {
      return;
    }
  
    setSelectedContent(content === selectedContent ? null : content);
  };

  return (
    <>
    <Header />
      <div className="container">
      <Nav />
    <div className="inspection-criteria">
      <div className="inspection-criteria-header">
        <h3>검수기준</h3>
      </div>
      <table>
  <tbody>
    {[0, 1, 2].map((rowIndex) => (
      <tr key={rowIndex}>
        {[0, 1, 2].map((colIndex) => {
          const index = rowIndex * 3 + colIndex;
          const content = gridContents[index];
          const isSelectable = !!content;

          return (
            <td
              key={colIndex}
              className={`${
                content === selectedContent ? 'selected' : ''
              } ${isSelectable ? 'selectable' : ''}`}
              onClick={() => handleCellClick(content)}
            >
              <a className="cell-link">{content}</a>
            </td>
          );
        })}
      </tr>
    ))}
  </tbody>
</table>

      {/* 선택된 칸의 내용을 보여주는 부분 */}
      {selectedContent && (
        <div className="selected-content">
          <p dangerouslySetInnerHTML={createMarkup(selectedContentDetails[selectedContent])} />
        </div>
      )}
    </div>
      </div>
      <Footer />
    </>
  );
};

export default InspectionCriteria;
