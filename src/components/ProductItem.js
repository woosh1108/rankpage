// ProductItem.js

import React from 'react';
import './ProductItem.css';
import shoes from '../shoes.png';

const formatNumber = (num) => {
  if (num >= 10000) {
    const formattedNumber = (num / 10000).toFixed(1);
    const decimalPart = formattedNumber.split('.')[1];
    return decimalPart === '0' ? formattedNumber.split('.')[0] + '만' : formattedNumber + '만';
  }
  return num.toLocaleString();
};

const ProductItem = ({
  ranking,
  image,
  brand,
  englishName,
  koreanName,
  price,
  buyNowPrice,
  bookmarkCount,
  reviewCount,
}) => {
  return (
    <div className="product-item">
      <div className="product-rank">{ranking}</div>
      <img src={shoes} alt="Product item" />
      <div className="product-info">
        <div className="product-details">
          <div className="brand-name">{brand}</div>
          <div className="product-name-english">{englishName}</div>
          <div className="product-name-korean">{koreanName}</div>
          <div className="product-price">{price.toLocaleString()}원</div>
          <div className="buy-now">즉시 구매가</div>
        </div>
        <div className="product-stats">
          <div><img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fpng%2F512%2F1174%2F1174410.png&type=a340" alt={'북마크'} /> {formatNumber(bookmarkCount)}</div>
          <div><img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fus.123rf.com%2F450wm%2Ficonmama%2Ficonmama1601%2Ficonmama160100163%2F50953775-writing-icon.jpg&type=sc960_832" alt={'후기'} /> {formatNumber(reviewCount)}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
