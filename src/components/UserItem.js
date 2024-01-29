import React from 'react';
import './UserItem.css';

const UserItem = ({ 
  userId,
  userNickname,
  userFollowsCount,
  isFollowing,
  handleFollowToggle // props로 전달된 함수
 }) => {
    console.log('ProductItem Rendering:', userId);

  // 팔로우 버튼 클릭 시 호출되는 함수
  const handleFollowClick = () => {
    handleFollowToggle(userId); // 팔로우 토글 핸들러 호출
  };

  return (
    <div className="user-item">
      <a className='user-profile'>
        {/* <img className="user-img" src={user.imageUrl} alt={user.nickname} /> */}
        <span className="user-info">
          <span className="user-id">{userId}</span>
          <div className="user-details">
            <span className="nickname">{userNickname}</span>
            <span className="dot"></span>
            <span className="followers">팔로워 {userFollowsCount}</span>
          </div>
        </span>
      </a>
      <button 
        onClick={handleFollowClick} 
        className={isFollowing ? 'following' : 'follow'}
      >
        {isFollowing ? '팔로잉' : '팔로우'}
      </button>
    </div>
  );
};

export default UserItem;
