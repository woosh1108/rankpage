// RankPage.js

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductItem from './ProductItem';
import './RankPage.css';
import menShoeDummyData from '../MenShoeDummyData';

const RankPage = ({ title }) => {
  const products = menShoeDummyData;
  
  return (
    <>
    <Header />
      <div className="container">
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
      </div>
      <Footer />
    </>
  );
};

export default RankPage;
