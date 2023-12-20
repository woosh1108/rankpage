// Search.js

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Search.css';
import menShoeDummyData from '../../MenShoeDummyData';

import SearchInput from './SearchInput'; // 검색바
import Autocomplete from './Autocomplete'; // 자동완성
import RecentSearches from './RecentSearches'; // 최근 검색어
import RecommendationKeywords from './RecommendationKeywords'; // 추천 검색어
import PopularKeywords from './PopularKeywords'; // 인기 검색어
import PopularCollaborations from './PopularCollaborations'; // 인기 콜라보
import RecentlyViewedProducts from './RecentlyViewedProducts'; // 최근 본 상품

const Search = () => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [showClearModal, setShowClearModal] = useState(false);
  const [recommendedKeywords, setRecommendedKeywords] = useState([]);
  const [popularKeywords, setPopularKeywords] = useState([]);
  const [popularCollaborations, setPopularCollaborations] = useState([]);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [searchMode, setSearchMode] = useState('normal');

  const clearSearchTerm = () => {
    setSearchQuery('');
    setSearchMode('normal');
  };

  useEffect(() => {
    fetchRecentSearches().then((data) => {
      setRecentSearches(data);
      setSearchQuery('');
    });

    fetchRecommendedKeywords().then((data) => setRecommendedKeywords(data));
    fetchPopularKeywords().then((data) => setPopularKeywords(data));
    fetchPopularCollaborations().then((data) => setPopularCollaborations(data));
    fetchRecentlyViewedProducts().then((data) => setRecentlyViewedProducts(data));
  }, []);

  // 최근 검색어 데이터
  const fetchRecentSearches = async () => {
    return [`노스페이스 패딩`, `나이키 루나레이크`, `나이키 에어포스`, `살로몬 컨투어 패딩`, `목도리`, `장원영 안경`, `겐조 x 베르디`];
  };

  // 추천 검색어 데이터
  const fetchRecommendedKeywords = async () => {
    const data = [
      '겐조 x 베르디',
      '어그 부츠',
      '아디다스 운동화',
      '나이키 에어맥스',
      '아모레퍼시픽 맨즈',
    ];
    setRecommendedKeywords(data);
    return data;
  };

  // 인기 검색어 데이터
  const fetchPopularKeywords = async () => {
    return [`장갑`, `롱패딩`, `노스페이스 패딩`, `목도리`, `머플러`,
      `어그`, `노스페이스 눕시`, `범고래`, `슈프림 모자`, `빵빵이`,
      `나이키 패딩`, `아크네`, `몽클레어`, `호카`, `비니`,
      `덩크로우`, `레고`, `이미스`, `셀린느`, `미우미우`];
  };

  // 인기 콜라보 데이터
  const fetchPopularCollaborations = async () => {
    return [`슈프림 x 노스페이스`, `아이앱 스튜디오 x 헬리녹스`, `아디다스 x 웨일스보너`,
      `아크테릭스 x 빔즈`, `나이키 x 사카이`, `자라 x 아더에러`];
  };

  // 최근 본 상품 데이터
  const fetchRecentlyViewedProducts = async () => {
    return menShoeDummyData;
  };

  const handleSearchInput = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() !== '') {
      setSearchMode('autocomplete');

      fetchRecommendedKeywords().then((data) => {
        const filteredKeywords = data.filter((keyword) =>
          keyword.toLowerCase().includes(query.toLowerCase())
        );
        setAutocompleteResults(filteredKeywords);
      });
    } else {
      setSearchMode('normal');
    }
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const confirmClearRecentSearches = () => {
    setShowClearModal(true); // 모달을 표시
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    setShowClearModal(false);
  };

  const cancelClearRecentSearches = () => {
    setShowClearModal(false);
  };

  const handleDeleteRecentSearch = (searchToDelete) => {
    const updatedSearches = recentSearches.filter((search) => search !== searchToDelete);
    setRecentSearches(updatedSearches);
  };

  const shouldRenderRecentSearchesSection = () => {
    return recentSearches.length > 0;
  };

  const handleSearchSubmit = () => {
    const results = performSearch(searchQuery);
    setSearchResults(results);
    setSearchMode('normal');
  };

  const performSearch = (query) => {
    return ['Result A', 'Result B', 'Result C'].filter(result =>
      result.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
  fetchRecommendedKeywords().then((data) => setRecommendedKeywords(data));
    if (!showClearModal) {
      // 모달이 닫힐 때의 로직 추가
    }
  }, [showClearModal]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="search-container">
      <SearchInput
        searchQuery={searchQuery}
        handleSearchInput={handleSearchInput}
        handleEnterKeyPress={handleEnterKeyPress}
        clearSearchTerm={clearSearchTerm}
      />

      {searchMode === 'autocomplete' && autocompleteResults.length > 0 && (
        <Autocomplete autocompleteResults={autocompleteResults} />
      )}

      <div className='search-content'>
        {searchQuery === '' && shouldRenderRecentSearchesSection() && (
          <RecentSearches
            searches={recentSearches}
            onClear={confirmClearRecentSearches}
            onDelete={handleDeleteRecentSearch}
          />
        )}
        {searchQuery === '' && (
          <RecommendationKeywords keywords={recommendedKeywords} />
        )}
        {searchQuery === '' && (
          <PopularKeywords keywords={popularKeywords} />
        )}
        {searchQuery === '' && (
          <PopularCollaborations collaborations={popularCollaborations} />
        )}
        {searchQuery === '' && recentlyViewedProducts.length > 0 && (
          <RecentlyViewedProducts products={recentlyViewedProducts} />
        )}
      </div>

      {showClearModal && (
        <div className="modal">
          <div className='layer-header'>
            <h2 className='title'>최근 검색어 삭제</h2>
          </div>
          <div className='layer-content'>
            <div className='alert-box'>
              <p className='alert-desc'>검색기록을 모두 삭제하시겠습니까?</p>
            </div>
            <div className='layer-btn'>
              <button className='btn outlinegrey medium' onClick={cancelClearRecentSearches}>취소</button>
              <button className='btn solid medium' onClick={clearRecentSearches}>확인</button>
            </div>
          </div>
        </div>
      )}

      <button className="back-button" onClick={goBack}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default Search;
