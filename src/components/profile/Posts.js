import React from 'react';
import LoadingDots from '../Navigation/LoadingDots';
import Post from './Post';

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <LoadingDots />;
  }
  return (
    <>
      <div className="list-group">
        {posts.length ? (
          <>
            {posts.map((post) => {
              return <Post key={post._id} post={post} />;
            })}
          </>
        ) : (
          <>
            <>
              <h3 className="text-center my-5">
                This user doesn't have any posts yet
              </h3>
            </>
          </>
        )}
      </div>
    </>
  );
};

export default Posts;
