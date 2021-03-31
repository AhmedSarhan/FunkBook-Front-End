import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
const Post = ({ post }) => {
  return (
    <>
      <Link
        to={`/post/${post._id}`}
        className="list-group-item list-group-item-action"
      >
        <img
          className="avatar-tiny"
          src={post.author.avatar}
          alt={post.author.username}
        />{' '}
        <strong>{post.title}</strong>
        <span className="text-muted small">
          {' '}
          by {post.author.username} on{' '}
          {moment(post.createdDate).format('yyyy/MM/DD')}{' '}
        </span>
      </Link>
    </>
  );
};

export default Post;
