import React from 'react';
import { Link } from 'react-router-dom';
import LoadingDots from '../Navigation/LoadingDots';
const FollowList = ({ membersList, caseScenario, loading }) => {
  if (loading) {
    return <LoadingDots />;
  }
  return (
    <>
      <div className="list-group">
        {membersList.length ? (
          <>
            {membersList.map((member) => {
              return (
                <Link
                  key={member.username}
                  to={`/profile/${member.username}`}
                  className="list-group-item list-group-item-action"
                >
                  {' '}
                  <img className="avatar-tiny" src={member.avatar} />{' '}
                  {member.username}{' '}
                </Link>
              );
            })}
          </>
        ) : (
          <>
            <h3 className="text-center my-5">{caseScenario}</h3>
          </>
        )}
      </div>
    </>
  );
};

export default FollowList;
