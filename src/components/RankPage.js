// RankPage.js

import React from 'react';
import ProductItem from './ProductItem';
import './RankPage.css';
import menShoeDummyData from '../MenShoeDummyData';

const RankPage = ({ title }) => {
  const products = menShoeDummyData;
  
  return (
    <div className="rank-page">
      <h2>{title}</h2>
      <div className="product-list">
        {products.map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
        
      </div>
      <div className="share-container">
        <button className="share-button">친구에게 공유하기</button>
      </div>
    </div>
  );
};

export default RankPage;
