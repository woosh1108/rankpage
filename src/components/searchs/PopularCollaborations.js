// PopularCollaborations.js

import React from 'react';
import './PopularCollaborations.css';

const PopularCollaborations = ({ collaborations }) => (
  <section>
    <h2>인기 콜라보</h2>
    <div className="ranked-list">
      <div className="column">
        <ul>
          {collaborations.slice(0, 3).map((collaboration, index) => (
            <CollaborationItem key={index} rank={index + 1} collaboration={collaboration} />
          ))}
        </ul>
      </div>
      <div className="column">
        <ul>
          {collaborations.slice(3, 6).map((collaboration, index) => (
            <CollaborationItem key={index + 3} rank={index + 4} collaboration={collaboration} />
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const CollaborationItem = ({ rank, collaboration }) => (
  <li>
    <span className="rank">{rank}</span>
    <span>{collaboration}</span>
  </li>
);

export default PopularCollaborations;
