// SearchInput.js
// 검색바

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './SearchInput.css';

const SearchInput = ({ searchQuery, handleSearchInput, onSearchSubmit }) => {
  
  const clearSearchTerm = () => {
    handleSearchInput({ target: { value: '' } }); // 검색어 입력 핸들러 호출하여 검색어를 지움
  };
  
  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      onSearchSubmit(); // 엔터 키를 누르면 검색어를 전달하는 함수 호출
    }
  };

  return (
    <div className="search-input">
      <input
        type="text"
        placeholder="브랜드, 상품, 프로필, 태그 등"
        value={searchQuery}
        onChange={handleSearchInput}
        onKeyDown={(e) => { handleEnterKey(e); }}
      />
      {searchQuery && (
        <button className="clear-icon" onClick={clearSearchTerm}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
