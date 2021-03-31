import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import LoadingCircle from '../Navigation/LoadingCircle';
const BasicData = ({ user, setRefetchState, fetchState }) => {
  const { loggedInState } = useContext(AppContext);
  const userName = localStorage.getItem('socialMediaUsername');
  const [isLoading, setIsLoading] = useState(false);
  const serverRequest = axios.CancelToken.source();
  console.log(
    userName,
    user.profileUsername,
    userName !== user.profileUsername
  );

  useEffect(() => {
    return () => serverRequest.cancel();
  }, []);
  const StartFollowingHandler = async () => {
    setIsLoading(true);
    await axios
      .post(
        `/addFollow/${user.profileUsername}`,
        {
          token: localStorage.getItem('socialMediaToken'),
        },
        { cancelToken: serverRequest.token }
      )
      .then((res) => {
        if (res.data) {
          setIsLoading(false);
          setRefetchState(!fetchState);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const unFollowHandler = async () => {
    setIsLoading(true);
    await axios
      .post(
        `/removeFollow/${user.profileUsername}`,
        {
          token: localStorage.getItem('socialMediaToken'),
        },
        { cancelToken: serverRequest.token }
      )
      .then((res) => {
        if (res.data) {
          setIsLoading(false);
          setRefetchState(!fetchState);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const FollowBtn = () => {
    if (
      loggedInState &&
      userName !== user.profileUsername &&
      !user.isFollowing
    ) {
      return (
        <button
          className="btn btn-primary btn-sm ml-2 d-inline-flex"
          onClick={StartFollowingHandler}
        >
          Follow{' '}
          {isLoading ? (
            <LoadingCircle
              width={'2em'}
              margin={'auto 10px'}
              backgroundColor={'255, 255, 255'}
              color={'#007bff'}
            />
          ) : (
            <i className="mx-2 mt-1  fas fa-user-plus"></i>
          )}
        </button>
      );
    } else if (
      loggedInState &&
      userName !== user.profileUsername &&
      user.isFollowing
    ) {
      return (
        <button
          className="btn btn-danger btn-sm ml-2 d-inline-flex"
          onClick={unFollowHandler}
        >
          unFollow{' '}
          {isLoading ? (
            <LoadingCircle
              width={'2em'}
              margin={'auto 10px'}
              backgroundColor={'255, 255, 255'}
              color={'#dc3545'}
            />
          ) : (
            <i className="mx-2 mt-1 fas fa-user-minus"></i>
          )}
        </button>
      );
    }

    return <span></span>;
  };
  return (
    <>
      <h2>
        <img className="avatar-small" src={user.profileAvatar} />{' '}
        {user.profileUsername}
        <FollowBtn />
      </h2>
    </>
  );
};

export default BasicData;
