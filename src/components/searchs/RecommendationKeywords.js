// RecommendationKeywords.js
// 추천 검색어

import React from 'react';
import './RecommendationKeywords.css';

const RecommendationKeywords = ({ keywords }) => (
  <section className="recommendation-search">
    <h2>추천 검색어</h2>
    <div>
      <ul>
        {keywords.map((keyword, index) => (
          <li key={index}>{keyword}</li>
        ))}
      </ul>
    </div>
  </section>
);

export default RecommendationKeywords;
