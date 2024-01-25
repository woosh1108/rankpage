// SearchResults.js

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './SearchResults.css';
import ProductItem from './ProductItem';
import menShoeDummyData from '../MenShoeDummyData';

import SearchInput from './searchs/SearchInput'; // 검색바
import Autocomplete from './searchs/Autocomplete'; // 자동완성

const SearchResults = ({ onSaveRecentSearch }) => {
  const [activeTab, setActiveTab] = useState('products');
  const [keyword, setKeyword] = useState('');
  const [searchMode, setSearchMode] = useState('normal');
  const [autocompleteResults, setAutocompleteResults] = useState([]); // 자동 완성
  const [relatedKeywords, setRelatedKeywords] = useState([]); // 연관 검색어
  const [products, setProducts] = useState([]); // tab
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const keywordFromUrl = urlSearchParams.get('keyword');
    setKeyword(keywordFromUrl || '');
  }, [location.search]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const generateLink = () => {
    const baseUrl = 'http://localhost:8080/api/search';
    return `${baseUrl}?keyword=${keyword}&tab=${activeTab}`;
  };

  const handleSearchInput = async (event) => {
    const query = event.target.value;
    setKeyword(query);
  
    if (query.trim() !== '') {
      setSearchMode('autocomplete');
  
      // 자동완성 결과 받아오기
      const autocompleteResults = await fetchAutocompleteResults(query);
      setAutocompleteResults(autocompleteResults);
    } else {
      setSearchMode('normal');
    }
  };
  
  const handleSearchSubmit = async () => {
    const query = keyword.trim();
    if (query !== '') {
      onSaveRecentSearch(query);

      // 상품 목록과 연관 검색어를 가져오는 함수 호출
      fetchData(query, activeTab);
      
      // 검색 완료 후 자동완성 결과 초기화
      setAutocompleteResults([]);
    }
  };

  const fetchData = async (query, tab) => {
    try {
      // 백엔드에 요청 보내기
      const response = await fetch(`http://localhost:8080/api/search?keyword=${encodeURIComponent(query)}&tab=${tab}`);
  
      // 응답 상태코드 확인
      if (!response.ok) {
        console.error('Fetch failed with status:', response.status);
        return;
      }
  
      const data = await response.json();
  
      // 응답 데이터를 상품 목록 및 연관 검색어로 설정
      setProducts(data || []); // data가 배열이라면 그대로, 아니면 빈 배열을 설정
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  
  // 자동 완성 받아오기
  const fetchAutocompleteResults = async (query) => {
    try {
      const response = await fetch(`http://localhost:8080/api/search/autocomplete?keyword=${encodeURIComponent(query)}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching autocomplete results:', error);
      return [];
    }
  };

  // 연관 검색어 받아오기
  const fetchRelatedKeywords = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/search/relatedProducts?keyword=${encodeURIComponent(keyword)}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching related keywords:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchRelatedKeywordsAndUpdateState = async () => {
      if (searchMode === 'normal' && keyword.trim() !== '') {
        try {
          const relatedKeywordsData = await fetchRelatedKeywords(keyword);
          setRelatedKeywords(relatedKeywordsData);
        } catch (error) {
          console.error('연관 키워드 업데이트 중 에러 발생:', error);
        }
      }
    };
  
    // 각 입력 변화마다 fetchRelatedKeywordsAndUpdateState 함수 실행
    fetchRelatedKeywordsAndUpdateState();
  
    // onSaveRecentSearch 함수를 전달받아 검색어를 저장
    onSaveRecentSearch(keyword);
  }, [searchMode, keyword, onSaveRecentSearch]);
  
  return (
    <>
    <Header />
    <div className="container r_content">
      <div className='search_title'>
      <SearchInput
            searchQuery={keyword}
            handleSearchInput={handleSearchInput}
            onSearchSubmit={handleSearchSubmit}
          />
        {searchMode === 'autocomplete' && autocompleteResults.length > 0 && (
          <Autocomplete autocompleteResults={autocompleteResults} />
        )}
      <div className='related_keywords'>
          <p className='title'>연관</p>
          <div className='keywords'>
          {relatedKeywords.map((relatedKeyword, index) => (
            <a key={index} className='keyword' href={`YOUR_LINK_HERE/${encodeURIComponent(relatedKeyword)}`}>
              <p>{relatedKeyword}</p>
            </a>
          ))}
          </div>
        </div>
      </div>

        <nav className='shop_tab'>
          <div className='tabs'>
            <ul className='ul_tab'>
              <li className='li_tab'>
              <a className={`tab ${activeTab === 'products' ? 'active' : ''}`} onClick={() => handleTabClick('products')}>
                  <span className='products'>상품</span>
                </a>
              </li>
              <li className='li_tab'>
              <a className={`tab ${activeTab === 'communities' ? 'active' : ''}`} onClick={() => handleTabClick('communities')}>
                  <span className='communities'>스타일</span>
                </a>
              </li>
              <li className='li_tab'>
              <a className={`tab ${activeTab === 'users' ? 'active' : ''}`} onClick={() => handleTabClick('users')}>
                  <span className='users'>프로필</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="product-list">
          {activeTab === 'products' &&
            products.map((product) => (
              <ProductItem key={product.productId} {...product} />
          ))}
        </div>

    </div>
    <Footer />
    </>
  );
};

export default SearchResults;
