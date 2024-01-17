// Search.js

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Search.css';
import menShoeDummyData from '../../MenShoeDummyData';
import axios from 'axios';  // axios import 추가

import SearchInput from './SearchInput'; // 검색바
import Autocomplete from './Autocomplete'; // 자동완성
import RecentSearches from './RecentSearches'; // 최근 검색어
import RecommendationKeywords from './RecommendationKeywords'; // 추천 검색어
import PopularKeywords from './PopularKeywords'; // 인기 검색어
import PopularBrands from './PopularBrands'; // 인기 콜라보
import RecentlyViewedProducts from './RecentlyViewedProducts'; // 최근 본 상품

const Search = () => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [showClearModal, setShowClearModal] = useState(false);
  const [recommendedKeywords, setRecommendedKeywords] = useState([]);; // 추천 검색어
  const [popularKeywords, setPopularKeywords] = useState([]); // 인기 검색어
  const [popularBrands, setPopularBrands] = useState([]); // 인기 브랜드
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
    fetchRecentSearches();
    fetchRecommendedKeywords().then((data) => setRecommendedKeywords(data)); // 추천 검색어
    fetchPopularKeywords().then((data) => setPopularKeywords(data)); // 인기 검색어
    fetchPopularBrands().then((data) => setPopularBrands(data)); // 인기 브랜드
    fetchRecentlyViewedProducts().then((data) => setRecentlyViewedProducts(data));
  }, []);

  // 최근 검색어 데이터
  const fetchRecentSearches = () => {
    const cookies = document.cookie.split(';');
    const recentSearchesCookie = cookies.find(cookie => cookie.trim().startsWith('recentSearches='));
    
    if (recentSearchesCookie) {
      const searches = recentSearchesCookie.split('=')[1].split(',');
      setRecentSearches(searches);
    }
  };

  // 추천 검색어
  const fetchRecommendedKeywords = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/search/top5ProductsByTenderCount');
      const data = response.data;
  
      setRecommendedKeywords(data);
  
      return data;
    } catch (error) {
      console.error('추천 키워드를 불러오는 중 오류 발생:', error);
      return [];
    }
  };

  // 인기 검색어
  const fetchPopularKeywords = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/search/top20PopularByTenderCount');
      const data = response.data;
      setPopularKeywords(data);
      return data;
    } catch (error) {
      console.error('인기 검색어를 불러오는 중 오류 발생:', error);
      return [];
    }
  };

  // 인기 브랜드
  const fetchPopularBrands = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/search/top6BrandsByTenderCount');
      const data = response.data;
      setPopularBrands(data);
      return data;
    } catch (error) {
      console.error('인기 브랜드를 불러오는 중 오류 발생:', error);
      return [];
    }
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
    document.cookie = 'recentSearches=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setRecentSearches([]);
    setShowClearModal(false);
  };

  const cancelClearRecentSearches = () => {
    setShowClearModal(false);
  };

  const handleDeleteRecentSearch = (searchToDelete) => {
    const updatedSearches = recentSearches.filter((search) => search !== searchToDelete);
    setRecentSearches(updatedSearches);

    const updatedSearchesString = updatedSearches.join(',');
    document.cookie = `recentSearches=${updatedSearchesString}`;
  };

  const shouldRenderRecentSearchesSection = () => {
    return recentSearches.length > 0;
  };

  const handleSearchSubmit = () => {
    const results = performSearch(searchQuery);
    setSearchResults(results);
    setSearchMode('normal');

    saveRecentSearch(searchQuery);
  };

  const performSearch = (query) => {
    return ['Result A', 'Result B', 'Result C'].filter(result =>
      result.toLowerCase().includes(query.toLowerCase())
    );
  };

  const saveRecentSearch = (keyword) => {
    const updatedSearches = [keyword, ...recentSearches.slice(0, 4)]; // 최근 5개까지만 저장
    setRecentSearches(updatedSearches);

    const updatedSearchesString = updatedSearches.join(',');
    document.cookie = `recentSearches=${updatedSearchesString}`;
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
        {/* 추천 검색어 */}
        {searchQuery === '' && (
          <RecommendationKeywords keywords={recommendedKeywords} />
        )}
        {/* 인기 검색어 */}
        {searchQuery === '' && (
          <PopularKeywords keywords={popularKeywords} />
        )}
        {/* 인기 브랜드 */}
        {searchQuery === '' && (
          <PopularBrands brands={popularBrands} />
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
