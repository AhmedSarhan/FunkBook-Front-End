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
            Are you sick of short tweets and impersonal &ldquo;shared&rdquo;
            posts that are reminiscent of the late 90&rsquo;s email forwards? We
            believe getting back to actually writing is the key to enjoying the
            internet again.
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
