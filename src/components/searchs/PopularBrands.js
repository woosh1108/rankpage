// PopularBrands.js

import React from 'react';
import './PopularBrands.css';

const PopularBrands = ({ brands }) => (
  <section>
    <h2>인기 브랜드</h2>
    <div className="ranked-list">
      <div className="column">
        <ul>
          {brands.slice(0, 3).map((brand, index) => (
            <BrandItem key={index} rank={index + 1} brand={brand.productBrandKorName} />
          ))}
        </ul>
      </div>
      <div className="column">
        <ul>
          {brands.slice(3, 6).map((brand, index) => (
            <BrandItem key={index + 3} rank={index + 4} brand={brand.productBrandKorName} />
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const BrandItem = ({ rank, brand }) => (
  <li>
    <span className="rank">{rank}</span>
    <span>{brand}</span>
  </li>
);

export default PopularBrands;
