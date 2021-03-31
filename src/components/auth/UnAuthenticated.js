import React from 'react';
import '../../App.css';
import Register from './Register';

const UnAuthenticated = () => {
  return (
    <div className="container py-md-5">
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5">
          <h1 className="display-3">Remember Writing?</h1>
          <p className="lead text-muted">
            This is a Social Media App to share posts, chat with others created
            with React.js, Node.js, MongoDb, and Socket.io Wish you a fun time
            with us
          </p>
        </div>
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
          <Register />
        </div>
      </div>
    </div>
  );
};

export default UnAuthenticated;
