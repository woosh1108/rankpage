// RecentlyViewedProducts.js
// 최근 본 상품

import React from 'react';
import shoes from '../../shoes.png';
import './RecentlyViewedProducts.css';

const RecentlyViewedProducts = ({ products }) => (
  <section className="resent-product">
    <span>
      최근 본 상품
      <a className="add-link">더보기</a>
    </span>
    <div className="product-list">
      {products.map((product, index) => (
        <ProductItem key={index} product={product} />
      ))}
    </div>
  </section>
);

const ProductItem = ({ product }) => (
  <div className="product-item">
    <img src={shoes} alt={product.englishName} />
    <div className="brand-name">{product.brand}</div>
    <div className="product-name-english">{product.englishName}</div>
  </div>
);

export default RecentlyViewedProducts;
