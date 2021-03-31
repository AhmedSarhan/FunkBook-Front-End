import React from 'react';

const Controls = ({
  setCurrentTap,
  currentTap,
  postsCount,
  followersCount,
  followingCount,
}) => {
  return (
    <>
      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <button
          onClick={() => setCurrentTap('posts')}
          className={`nav-item nav-link ${
            currentTap === 'posts' ? ' active' : ' '
          }`}
        >
          Posts: {postsCount}
        </button>
        <button
          onClick={() => setCurrentTap('followers')}
          className={`nav-item nav-link ${
            currentTap === 'followers' ? ' active' : ' '
          }`}
        >
          Followers: {followersCount}
        </button>
        <button
          onClick={() => setCurrentTap('following')}
          className={`nav-item nav-link ${
            currentTap === 'following' ? ' active' : ' '
          }`}
        >
          Following: {followingCount}
        </button>
      </div>
    </>
  );
};

export default Controls;
