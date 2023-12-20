// Autocomplete.js
// 자동 완성 검색

import React from 'react';
import './Autocomplete.css';

const AutocompleteSection = ({ autocompleteResults }) => (
  <section className="autocomplete-section">
    <div>
      <ul>
        {autocompleteResults.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  </section>
);

export default AutocompleteSection;

