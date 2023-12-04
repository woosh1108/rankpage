// RankPage.js

import React from 'react';
import ProductItem from './ProductItem';
import './RankPage.css';

const RankPage = ({ title, products }) => {
  return (
    <div className="rank-page">
      <h2>{title}</h2>
      <div className="product-list">
        {products.map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default RankPage;
