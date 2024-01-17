// PopularKeywords.js
// 인기 검색어

import React from 'react';
import './PopularKeywords.css';

const PopularKeywords = ({ keywords }) => {
  if (!keywords || !Array.isArray(keywords)) {
    // keywords가 없거나 배열이 아닌 경우 빈 배열을 사용하도록 처리
    keywords = [];
  }

  return (
    <section>
      <h2>인기 검색어</h2>
      <div className="ranked-list">
        <div className="column">
          <ul>
            {keywords.slice(0, 10).map((keyword, index) => (
              <li key={index}>
                <span className="rank">{index + 1}</span><span>{keyword.keyword}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="column">
          <ul>
            {keywords.slice(10, 20).map((keyword, index) => (
              <li key={index + 10}>
                <span className="rank">{index + 11}</span><span>{keyword.keyword}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PopularKeywords;
