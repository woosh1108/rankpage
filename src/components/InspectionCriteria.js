// InspectionCriteria.js
// 검수 기준

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Nav from './Nav';
import './InspectionCriteria.css';

// 선택된 셀의 내용에 HTML 적용을 위한 함수
const createMarkup = (htmlContent) => {
  return { __html: htmlContent };
};

const InspectionCriteria = () => {
  const [gridContents, setGridContents] = useState([]);
  const [selectedContent, setSelectedContent] = useState('');
  const [selectedContentDetails, setSelectedContentDetails] = useState('');

  useEffect(() => {
    const fetchInspectionTitles = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/inspection/titles');
        if (!response.ok) {
          throw new Error(`Error fetching inspection titles: ${response.statusText}`);
        }
        const data = await response.json();
        setGridContents(data);

        // 선택된 내용이 없다면, 기본적으로 첫 번째 내용을 선택
        if (!selectedContent && data.length > 0) {
          setSelectedContent(data[0]);
          const detailsResponse = await fetch(`http://localhost:8080/api/inspection/${encodeURIComponent(data[0])}`);
          if (detailsResponse.ok) {
            const detailsData = await detailsResponse.json();
            setSelectedContentDetails(detailsData.inspectionContent);
          }
        }
      } catch (error) {
        console.error('Error fetching inspection titles:', error);
      }
    };

    fetchInspectionTitles();
  }, [selectedContent]);

  useEffect(() => {
    const fetchInspectionCriteria = async () => {
      if (selectedContent) {
        try {
          const encodedTitle = encodeURIComponent(selectedContent);
          const response = await fetch(`http://localhost:8080/api/inspection/${encodedTitle}`);
          if (!response.ok) {
            throw new Error(`Error fetching inspection criteria: ${response.statusText}`);
          }
          const data = await response.json();
          setSelectedContentDetails(data.inspectionContent);
        } catch (error) {
          console.error('Error fetching inspection criteria:', error);
        }
      }
    };

    fetchInspectionCriteria();
  }, [selectedContent]);

  // 칸을 클릭했을 때 해당 내용을 설정하는 함수
  const handleCellClick = (content) => {
    // 선택된 셀의 내용이 변경된 경우에만 처리
    if (content !== selectedContent) {
      setSelectedContent(content);
    }
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
          <p dangerouslySetInnerHTML={{ __html: selectedContentDetails }} />
        </div>
      )}
    </div>
      </div>
      <Footer />
    </>
  );
};

export default InspectionCriteria;
