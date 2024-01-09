import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RankPage from './components/RankPage';
import NoticeDetail from './components/NoticeDetail';
import NoticeList from './components/NoticeList';
import FAQs from './components/FAQs';
import InspectionCriteria from './components/InspectionCriteria';
import Search from './components/searchs/Search';
import SearchResults from './components/SearchResults';

const App = () => {

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/Search" element={<Search />} />
          <Route path="/SearchResults" element={<SearchResults />} />
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
