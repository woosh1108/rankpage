
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RankPage from './components/RankPage';
import NoticeDetail from './components/NoticeDetail';
import NoticeList from './components/NoticeList';
import FAQs from './components/FAQs';
import InspectionCriteria from './components/InspectionCriteria';
import Search from './components/searchs/Search';
import SearchResults from './components/SearchResults';

const App = () => {
  // yourOnSaveRecentSearchFunction를 정의하거나 가져옴
  const yourOnSaveRecentSearchFunction = (searchQuery) => {};

  const [recentSearches, setRecentSearches] = useState([]);

  const saveRecentSearch = (keyword) => {
    // 기존 검색어 배열에서 중복 검색어 제거
    const updatedSearches = recentSearches.filter((search) => search !== keyword);

    // 새로운 검색어 추가
    const newRecentSearches = [keyword, ...updatedSearches.slice(0, 4)];

    // 최근 검색어 상태 업데이트
    setRecentSearches(newRecentSearches);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/search"
            element={<Search recentSearches={recentSearches} onSaveRecentSearch={saveRecentSearch} />}
          />
          <Route path="/SearchResults" element={<SearchResults onSaveRecentSearch={yourOnSaveRecentSearchFunction} />} />
          <Route path="/RankPage" element={<RankPage title="남성 신발 인기 순위" />} />
          <Route path="/NoticeList" element={<NoticeList />} />
          <Route path="/NoticeDetail/:id" element={<NoticeDetail />} />
          <Route path="/FAQs" element={<FAQs />} />
          <Route path="/InspectionCriteria" element={<InspectionCriteria />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
