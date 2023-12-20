// RecentSearches.js
// 최근 검색어

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './RecentSearches.css';

const RecentSearches = ({ searches, onClear, onDelete }) => (
  <section className="horizontal-section resent-search">
    <span>
      최근 검색어
      <a className="clear-link" onClick={onClear}>
        지우기
      </a>
    </span>
    <div>
      <ul>
        {searches.slice(0, 10).map((search, index) => (
          <RecentSearchItem key={index} search={search} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  </section>
);

const RecentSearchItem = ({ search, onDelete }) => (
  <li>
    <div>
      {search}
      <button className="delete-icon" onClick={() => onDelete(search)}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  </li>
);

export default RecentSearches;
