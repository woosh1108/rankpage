// ProductItem.js

import React from 'react';
import './ProductItem.css';

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
      <img src="https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_8714534%2F87145349882.jpg&type=f372_372" alt="Product item" />
      <div className="product-info">
        <div className="product-details">
          <div>{brand}</div>
          <div>{englishName}</div>
          <div>{koreanName}</div>
          <div>{price}원</div>
          <div>즉시 구매가</div>
        </div>
        <div className="product-stats">
          <div><img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fpng%2F512%2F1174%2F1174410.png&type=a340" alt={'북마크'} /> {bookmarkCount}</div>
          <div><img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fus.123rf.com%2F450wm%2Ficonmama%2Ficonmama1601%2Ficonmama160100163%2F50953775-writing-icon.jpg&type=sc960_832" alt={'후기'} /> {reviewCount}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
