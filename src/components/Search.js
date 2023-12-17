// Search.js

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import SearchResults from './SearchResults';
import './Search.css';

const Search = () => {
  // 각 섹션의 데이터를 가져오기 위한 상태
  const [recentSearches, setRecentSearches] = useState([]);
  const [recommendedKeywords, setRecommendedKeywords] = useState([]);
  const [popularKeywords, setPopularKeywords] = useState([]);
  const [popularCollaborations, setPopularCollaborations] = useState([]);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);
  
  // 검색어 상태와 검색 결과 상태
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // 검색어를 지우는 함수
  const clearSearchTerm = () => {
    setSearchQuery(''); // 검색어 초기화
  };

  // useEffect를 이용하여 데이터를 가져오는 비동기 로직 구현
  useEffect(() => {
    // 최근 검색어 가져오기 (예시 데이터)
    fetchRecentSearches().then((data) => {
      setRecentSearches(data);
      // 검색어를 가져오는 비동기 함수에서 setSearchQuery를 사용하여 검색어 초기화
      setSearchQuery('');
    });

    // 추천 검색어 가져오기 (예시 데이터)
    fetchRecommendedKeywords().then((data) => setRecommendedKeywords(data));

    // 인기 검색어 가져오기 (예시 데이터)
    fetchPopularKeywords().then((data) => setPopularKeywords(data));

    // 인기 콜라보 가져오기 (예시 데이터)
    fetchPopularCollaborations().then((data) => setPopularCollaborations(data));

    // 최근 본 상품 가져오기 (예시 데이터)
    fetchRecentlyViewedProducts().then((data) => setRecentlyViewedProducts(data));
  }, []); // 빈 배열을 두어 컴포넌트가 마운트될 때 한 번만 실행

  // 최근 검색어를 가져오는 비동기 함수
  const fetchRecentSearches = async () => {
    // 여기에 최근 검색어를 가져오는 실제 로직을 추가
    return ['검색 1', '검색 2', '검색 3'];
  };

  // 각 섹션의 데이터를 가져오는 비동기 함수들
  const fetchRecommendedKeywords = async () => {
    // 여기에 추천 검색어를 가져오는 실제 로직을 추가
    return [`겐조 x 베르디`, `나투시 신상`, `나이키 루나레이크`, `장원영 안경`, `살로몬 컨투어 패딩`, `CP 팔라스`];
  };

  const fetchPopularKeywords = async () => {
    // 여기에 인기 검색어를 가져오는 실제 로직을 추가
    return [`장갑`, `롱패딩`, `노스페이스 패딩`, `목도리`, `머플러`, 
    `어그`, `노스페이스 눕시`, `범고래`, `슈프림 모자`, `빵빵이`, 
    `나이키 패딩`, `아크네`, `몽클레어`, `호카`, `비니`, 
    `덩크로우`, `레고`, `이미스`, `셀린느`, `미우미우`];
  };

  const fetchPopularCollaborations = async () => {
    // 여기에 인기 콜라보를 가져오는 실제 로직을 추가
    return [`슈프림 x 노스페이스`, `아이앱 스튜디오 x 헬리녹스`, `아디다스 x 웨일스보너`, 
    `아크테릭스 x 빔즈`, `나이키 x 사카이`, `자라 x 아더에러`];
  };

  const fetchRecentlyViewedProducts = async () => {
    // 여기에 최근 본 상품을 가져오는 실제 로직을 추가
    return ['Product A', 'Product B', 'Product C'];
  };

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
          placeholder="브랜드, 상품, 프로필, 태그 등"
          value={searchQuery}
          onChange={handleSearchInput}
          onKeyDown={handleEnterKeyPress} // Enter 키 입력 이벤트 처리
        />
        {searchQuery && (
          <button className="clear-icon" onClick={clearSearchTerm}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>
      <section className="horizontal-section resent-search">
        <h2>최근 검색어</h2>
        <div>
          <ul>
            {recentSearches.slice(0, 10).map((search, index) => (
              <li key={index}><div>{search}</div></li>
            ))}
          </ul>
        </div>
      </section>
      <section className="horizontal-section recommendation-search">
        <h2>추천 검색어</h2>
        <div>
          <ul>
            {recommendedKeywords.map((keyword, index) => (
              <li key={index}>{keyword}</li>
            ))}
          </ul>
        </div>
      </section>
      <section>
        <h2>인기 검색어</h2>
        <div className="ranked-list">
          <div className="column">
            <ul>
              {popularKeywords.slice(0, 10).map((keyword, index) => (
                <li key={index}>
                  <span className="rank">{index + 1}</span><span>{keyword}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="column">
            <ul>
              {popularKeywords.slice(10, 20).map((keyword, index) => (
                <li key={index + 10}>
                  <span className="rank">{index + 11}</span><span>{keyword}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section>
        <h2>인기 콜라보</h2>
        <div className="ranked-list">
          <div className="column">
            <ul>
              {popularCollaborations.slice(0, 3).map((collaboration, index) => (
                <li key={index}>
                  <span className="rank">{index + 1}</span><span>{collaboration}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="column">
            <ul>
              {popularCollaborations.slice(3, 6).map((collaboration, index) => (
                <li key={index + 3}>
                  <span className="rank">{index + 4}</span><span>{collaboration}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="horizontal-section">
        <h2>최근 본 상품</h2>
        <div>
          <ul>
            {recentlyViewedProducts.map((product, index) => (
              <li key={index}>{product}</li>
            ))}
          </ul>
        </div>
      </section>
      {/* 검색 결과 컴포넌트 추가
      <SearchResults searchQuery={searchQuery} searchResults={searchResults} />
 */}
    </div>
  );
};

export default Search;
