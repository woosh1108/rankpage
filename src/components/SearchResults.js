// SearchResults.js

import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './SearchResults.css';
import ProductItem from './ProductItem';
import UserItem from './UserItem';

import SearchInput from './searchs/SearchInput'; // 검색바
import Autocomplete from './searchs/Autocomplete'; // 자동완성

const SearchResults = ({ onSaveRecentSearch }) => {
  const [activeTab, setActiveTab] = useState('products'); // tab 기본값
  const [keyword, setKeyword] = useState('');
  const [searchMode, setSearchMode] = useState('normal');
  const [autocompleteResults, setAutocompleteResults] = useState([]); // 자동 완성
  const [relatedKeywords, setRelatedKeywords] = useState([]); // 연관 검색어
  const [products, setProducts] = useState([]); // 상품 tab
  const [users, setUsers] = useState([]); // 프로필 tab
  const location = useLocation();
  const navigate = useNavigate();
  const [searchCompleted, setSearchCompleted] = useState(false); // 검색 완료 여부
  
  // 데이터 받아오기
  const fetchData = useCallback(async (query, tab) => {
    try {
      const response = await fetch(`http://localhost:8080/api/search?keyword=${encodeURIComponent(query)}&tab=${tab}`);

      if (!response.ok) {
        console.error('Fetch failed with status:', response.status);
        return;
      }

      const data = await response.json();

      if (tab === 'users') {
        setUsers(data || []);
      } else {
        setProducts(data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [setUsers, setProducts]);

  // 자동 완성 받아오기
  const fetchAutocompleteResults = useCallback(async (query) => {
    try {
      const response = await fetch(`http://localhost:8080/api/search/autocomplete?keyword=${encodeURIComponent(query)}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching autocomplete results:', error);
      return [];
    }
  }, []);
  
  // 연관 검색어 받아오기
  const fetchRelatedKeywords = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/search/relatedProducts?keyword=${encodeURIComponent(keyword)}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching related keywords:', error);
      return [];
    }
  }, [keyword]);

  // 검색어 입력 핸들러
  const handleSearchInput = useCallback(async (event) => {
    const query = event.target.value;
    setKeyword(query);
    
    // 포커스가 되고 Enter 키가 눌렸을 때에만 검색 실행
    if (event.key === 'Enter' && query.trim() !== '') {
      setSearchCompleted(true);
    } else {
      setSearchCompleted(false);
    }
  }, []);

  // 검색 완료 핸들러
const handleSearchSubmit = useCallback(async () => {
  const query = keyword.trim();
  if (query !== '') {
    onSaveRecentSearch(query);
    
    // 연관 검색어를 다시 가져옴
    try {
      const relatedKeywordsData = await fetchRelatedKeywords(query);
      setRelatedKeywords(relatedKeywordsData);
    } catch (error) {
      console.error('연관 키워드 업데이트 중 에러 발생:', error);
    }

    // 상품 목록과 연관 검색어를 가져오는 함수 호출
    fetchData(query, activeTab);
    
    // 검색 완료 후 자동완성 결과 초기화
    setAutocompleteResults([]);
  }
}, [keyword, onSaveRecentSearch, fetchRelatedKeywords, setRelatedKeywords, fetchData, activeTab, setAutocompleteResults]);

  // 엔터 키 또는 포커스를 잃었을 때 검색 실행
  useEffect(() => {
    if (searchCompleted) {
      handleSearchSubmit();
    }
  }, [searchCompleted, handleSearchSubmit]);

  // tab을 눌렀을 때 결과값 다시 가져오기
  const handleTabClick = useCallback(async (tab) => {
    setActiveTab(tab);
    navigate(`?keyword=${encodeURIComponent(keyword)}&tab=${tab}`);
    await fetchData(keyword, tab);
  }, [fetchData, keyword, navigate]);

  // 사용자를 팔로우/언팔로우하는 함수
  const handleFollowToggle = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/user/follow/toggle?userId2=${userId}`, {
        method: 'POST'
      });
      if (!response.ok) {
        console.error('Follow toggle failed with status:', response.status);
        return;
      }
      // 팔로우 상태 변경 후 데이터를 다시 불러옴
      await fetchData(keyword, activeTab);
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const keywordFromUrl = urlSearchParams.get('keyword');
    const tabFromUrl = urlSearchParams.get('tab');
    setKeyword(keywordFromUrl || '');
    setActiveTab(tabFromUrl || 'products');
  }, [location.search]);

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
        {activeTab === 'products' && (
          <div className="product-list">
            {products.map((product) => (
                <ProductItem key={product.productId} {...product} />
            ))}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="user-list">
            {users.map((user) => (
              <UserItem 
                key={user.userId} 
                userId={user.userId}
                userNickname={user.userNickname}
                userFollowsCount={user.userFollowsCount}
                isFollowing={user.isFollowing}
                handleFollowToggle={handleFollowToggle}
              />
            ))}
          </div>
        )}
    </div>
    <Footer />
    </>
  );
};

export default SearchResults;