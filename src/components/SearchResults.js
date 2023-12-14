// SearchResults.js

import React from 'react';

const SearchResults = ({ searchQuery, searchResults }) => {
  return (
    <div>
      <h2>검색 결과</h2>
      <p>검색어: {searchQuery}</p>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
