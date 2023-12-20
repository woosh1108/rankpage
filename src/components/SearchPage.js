// Search.js

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // useNavigate로 변경
import SearchResults from './SearchResults';
import './Search.css';
import menShoeDummyData from '../MenShoeDummyData';
import shoes from '../shoes.png';

const Search = () => {
  // 각 섹션의 데이터를 가져오기 위한 상태
  const [recentSearches, setRecentSearches] = useState([]);
  const [showClearModal, setShowClearModal] = useState(false);
  const [recommendedKeywords, setRecommendedKeywords] = useState([]);
  const [popularKeywords, setPopularKeywords] = useState([]);
  const [popularCollaborations, setPopularCollaborations] = useState([]);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기

  // 검색어 상태와 검색 결과 상태
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // 추천 검색어를 가져오는 상태와 함수
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  // 검색 모드를 나타내는 상태
  const [searchMode, setSearchMode] = useState('normal'); // normal, autocomplete

  // 검색어를 지우는 함수
  const clearSearchTerm = () => {
    setSearchQuery(''); // 검색어 초기화
    setSearchMode('normal'); // 검색어를 지우면 기본 모드로 변경
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
    return [`노스페이스 패딩`, `나이키 루나레이크`, `나이키 에어포스`, `살로몬 컨투어 패딩`, `목도리`, `장원영 안경`, `겐조 x 베르디`];
  };

  // 추천 검색어를 가져오는 비동기 함수
  const fetchRecommendedKeywords = async () => {
    // 여기에 추천 검색어를 가져오는 실제 로직을 추가
    return [
      '겐조 x 베르디',
      '어그 부츠',
      '아디다스 운동화',
      '나이키 에어맥스',
      '아모레퍼시픽 맨즈',
      // 추가적인 추천 검색어
    ];
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
    // 아래는 더미 데이터를 사용한 예시
    return menShoeDummyData;
  };

  // 검색어 입력 핸들러
const handleSearchInput = (event) => {
  const query = event.target.value;
  setSearchQuery(query);

  // 검색어가 비어있지 않으면 자동완성 모드로 변경
  if (query.trim() !== '') {
    setSearchMode('autocomplete');

    // 여기에 추천 검색어를 가져오고 필터링하는 로직을 추가
    fetchRecommendedKeywords().then((data) => {
      const filteredKeywords = data.filter((keyword) =>
        keyword.toLowerCase().includes(query.toLowerCase())
      );
      setAutocompleteResults(filteredKeywords);
    });
  } else {
    // 검색어가 비어있으면 기본 모드로 변경
    setSearchMode('normal');
  }
};

  // Enter 키 입력 핸들러
  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };
  
  // 최근 검색어 삭제 확인 창 띄우기
  const confirmClearRecentSearches = () => {
    const isConfirmed = window.confirm("검색기록을 모두 삭제하시겠습니까?");
    if (isConfirmed) {
      clearRecentSearches();
    }
  };

  const clearRecentSearches = () => {
    // 최근 검색어를 모두 삭제하는 로직 추가
    setRecentSearches([]);
    setShowClearModal(false);
  };

  const cancelClearRecentSearches = () => {
    setShowClearModal(false);
  };

  // 최근 검색어 삭제 핸들러
  const handleDeleteRecentSearch = (searchToDelete) => {
    // 최근 검색어 배열에서 선택된 검색어를 제거
    const updatedSearches = recentSearches.filter((search) => search !== searchToDelete);
    setRecentSearches(updatedSearches);
  };

  // 최근 검색어 섹션 렌더링 여부를 결정하는 함수
  const shouldRenderRecentSearchesSection = () => {
    return recentSearches.length > 0;
  };

  // 최근 검색어 항목을 렌더링하는 컴포넌트
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

  // 검색 실행 핸들러
  const handleSearchSubmit = () => {
    // 여기에 실제 검색 로직을 추가
    // 검색 결과를 setSearchResults로 업데이트
    const results = performSearch(searchQuery);
    setSearchResults(results);

    // 검색 완료 후 기본 모드로 변경
    setSearchMode('normal');
  };

  // 검색 로직을 수행하는 함수 (예시로 단순히 검색어와 일치하는 것을 반환)
  const performSearch = (query) => {
    return ['Result A', 'Result B', 'Result C'].filter(result =>
      result.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    // 모달이 닫힐 때 실행되는 부분
    if (!showClearModal) {
      // 여기에 모달이 닫힐 때의 로직을 추가
    }
  }, [showClearModal]);
  
  // 이전 페이지로 돌아가는 함수
  const goBack = () => {
    navigate(-1); // navigate 함수에 -1을 전달하여 이전 페이지로 이동
  };

  const ProductItem = ({ product }) => (
    <div className="product-item">
      <img src={shoes} alt={product.englishName} />
      <div className="brand-name">{product.brand}</div>
      <div className="product-name-english">{product.englishName}</div>
    </div>
  );

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
      {/* 자동완성 결과를 표시하는 부분 */}
      {searchMode === 'autocomplete' && autocompleteResults.length > 0 && (
        <section className="autocomplete-section">
          <div>
            <ul>
              {autocompleteResults.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <div className='search-content'>
      {/* 최근 검색어 섹션 렌더링 여부에 따라 조건부 렌더링 */}
      {searchQuery === '' && shouldRenderRecentSearchesSection() && (
        <section className="horizontal-section resent-search">
          <span>
            최근 검색어
            <a className="clear-link" onClick={confirmClearRecentSearches}>
              지우기
            </a>
          </span>
          <div>
            <ul>
              {recentSearches.slice(0, 10).map((search, index) => (
                  <RecentSearchItem
                    key={index}
                    search={search}
                    onDelete={handleDeleteRecentSearch}
                  />
                ))}
            </ul>
          </div>
        </section>
      )}
      {searchQuery === '' && (
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
      )}
      {searchQuery === '' && (
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
      )}
      {searchQuery === '' && (
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
      )}
      {searchQuery === '' && recentlyViewedProducts.length > 0 && (
      <section className="horizontal-section resent-product">
          <span>최근 본 상품
            <a className="add-link">
                더보기
            </a>
          </span>
          <div className="product-list">
            {recentlyViewedProducts.map((product, index) => (
              <ProductItem key={index} product={product} />
            ))}
          </div>
      </section>
      )}
      </div>
      {showClearModal && (
        <div className="modal">
          <p>검색기록을 모두 삭제하시겠습니까?</p>
          <button onClick={clearRecentSearches}>확인</button>
          <button onClick={cancelClearRecentSearches}>취소</button>
        </div>
      )}
      <button className="back-button">
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default Search;
