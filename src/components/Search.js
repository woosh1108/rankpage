// Search.js

import React, { useEffect, useState } from 'react';
import SearchResults from './SearchResults';

const Search = () => {
  // 각 섹션의 데이터를 가져오기 위한 상태
  const [recommendedKeywords, setRecommendedKeywords] = useState([]);
  const [popularKeywords, setPopularKeywords] = useState([]);
  const [popularCollaborations, setPopularCollaborations] = useState([]);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);

  // useEffect를 이용하여 데이터를 가져오는 비동기 로직 구현
  useEffect(() => {
    // 추천 검색어 가져오기 (예시 데이터)
    fetchRecommendedKeywords().then((data) => setRecommendedKeywords(data));

    // 인기 검색어 가져오기 (예시 데이터)
    fetchPopularKeywords().then((data) => setPopularKeywords(data));

    // 인기 콜라보 가져오기 (예시 데이터)
    fetchPopularCollaborations().then((data) => setPopularCollaborations(data));

    // 최근 본 상품 가져오기 (예시 데이터)
    fetchRecentlyViewedProducts().then((data) => setRecentlyViewedProducts(data));
  }, []); // 빈 배열을 두어 컴포넌트가 마운트될 때 한 번만 실행

  // 각 섹션의 데이터를 가져오는 비동기 함수들
  const fetchRecommendedKeywords = async () => {
    // 여기에 추천 검색어를 가져오는 실제 로직을 추가
    return ['React', 'JavaScript', 'Web Development'];
  };

  const fetchPopularKeywords = async () => {
    // 여기에 인기 검색어를 가져오는 실제 로직을 추가
    return ['Programming', 'Frontend', 'Backend'];
  };

  const fetchPopularCollaborations = async () => {
    // 여기에 인기 콜라보를 가져오는 실제 로직을 추가
    return ['Designers x Developers', 'Tech Talks', 'Open Source Projects'];
  };

  const fetchRecentlyViewedProducts = async () => {
    // 여기에 최근 본 상품을 가져오는 실제 로직을 추가
    return ['Product A', 'Product B', 'Product C'];
  };

  // 검색어 상태와 검색 결과 상태
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // 검색어 입력 핸들러
  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
  };

  // Enter 키 입력 핸들러
  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };
  
  // 검색 실행 핸들러
  const handleSearchSubmit = () => {
    // 여기에 실제 검색 로직을 추가
    // 검색 결과를 setSearchResults로 업데이트
    const results = performSearch(searchQuery);
    setSearchResults(results);
  };

  // 검색 로직을 수행하는 함수 (예시로 단순히 검색어와 일치하는 것을 반환)
  const performSearch = (query) => {
    return ['Result A', 'Result B', 'Result C'].filter(result =>
      result.toLowerCase().includes(query.toLowerCase())
    );
  };

  // 실제로 화면에 렌더링되는 부분
  return (
    <div className="search-container">
      <div className="search-input">
      <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchQuery}
          onChange={handleSearchInput}
          onKeyDown={handleEnterKeyPress} // Enter 키 입력 이벤트 처리
        />
      </div>
      <section>
        <h2>추천 검색어</h2>
        <ul>
          {recommendedKeywords.map((keyword, index) => (
            <li key={index}>{keyword}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>인기 검색어</h2>
        <ul>
          {popularKeywords.map((keyword, index) => (
            <li key={index}>{keyword}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>인기 콜라보</h2>
        <ul>
          {popularCollaborations.map((collaboration, index) => (
            <li key={index}>{collaboration}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>최근 본 상품</h2>
        <ul>
          {recentlyViewedProducts.map((product, index) => (
            <li key={index}>{product}</li>
          ))}
        </ul>
      </section>
      {/* 검색 결과 컴포넌트 추가 */}
      <SearchResults searchQuery={searchQuery} searchResults={searchResults} />
    </div>
  );
};

export default Search;
