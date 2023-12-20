// SearchInput.js
// 검색바

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './SearchInput.css';

const SearchInput = ({ searchQuery, handleSearchInput, handleEnterKeyPress, clearSearchTerm }) => (
  <div className="search-input">
    <input
      type="text"
      placeholder="브랜드, 상품, 프로필, 태그 등"
      value={searchQuery}
      onChange={handleSearchInput}
      onKeyDown={handleEnterKeyPress}
    />
    {searchQuery && (
      <button className="clear-icon" onClick={clearSearchTerm}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    )}
  </div>
);

export default SearchInput;
