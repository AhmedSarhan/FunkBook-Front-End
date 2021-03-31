import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Page from '../components/HOC/Page';
import BasicData from '../components/profile/BasicData';
import Controls from '../components/profile/Controls';
import FollowList from '../components/profile/FollowList';
import Posts from '../components/profile/Posts';

const Profile = () => {
  const [currentTapState, setCurrentTapState] = useState('posts');
  const [userPostsList, setUserPostsList] = useState([]);
  const [userFollowingList, setUserFollowingList] = useState([]);
  const [userFollowersList, setUserFollowersList] = useState([]);
  const [userBasicData, setUserBasicData] = useState({});
  const [loadingState, setLoadingState] = useState(true);
  const [reFetchState, setRefetchState] = useState(false);
  const serverRequest = axios.CancelToken.source();

  const params = useParams();
  const username = params.username;

  // fetching user basic data and followers
  useEffect(() => {
    getUserData();
    fetchUserPosts();
    fetchUserFollowingList();
    fetchUserFollowers();
    return () => {
      serverRequest.cancel();
    };
  }, [username]);

  // getting the user followers or following
  useEffect(() => {
    if (currentTapState === 'following') {
      fetchUserFollowingList();
    } else if (currentTapState === 'followers') {
      fetchUserFollowers();
    }
  }, [currentTapState]);

  // refetching data on change
  useEffect(() => {
    console.log('will be fetching');

    console.log('fetching now ....');
    getUserData();
    fetchUserPosts();
    fetchUserFollowingList();
    fetchUserFollowers();
    return () => {
      serverRequest.cancel();
    };
  }, [reFetchState]);

  const getUserData = async () => {
    setLoadingState(true);
    await axios
      .post(
        `/profile/${username}`,
        {
          token: localStorage.getItem('socialMediaToken'),
        },
        { cancelToken: serverRequest.token }
      )
      .then((res) => {
        console.log('basic data', res.data);
        setUserBasicData({ ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchUserPosts = async () => {
    setLoadingState(true);
    await axios
      .get(`/profile/${params.username}/posts`, {
        cancelToken: serverRequest.token,
      })
      .then((res) => {
        console.log('posts', res.data);
        if (res.data) {
          setUserPostsList([...res.data]);
        }
        setLoadingState(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchUserFollowingList = async () => {
    setLoadingState(true);
    await axios
      .get(`/profile/${params.username}/following`, {
        cancelToken: serverRequest.token,
      })
      .then((res) => {
        console.log('following', res.data);
        if (res.data) {
          setUserFollowingList([...res.data]);
        }
        setLoadingState(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchUserFollowers = async () => {
    setLoadingState(true);
    await axios
      .get(`/profile/${params.username}/followers`, {
        cancelToken: serverRequest.token,
      })
      .then((res) => {
        console.log('followers', res.data);
        if (res.data) {
          setUserFollowersList([...res.data]);
        }
        setLoadingState(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Page title="profile">
      <BasicData
        user={userBasicData}
        setRefetchState={setRefetchState}
        fetchState={reFetchState}
      />
      <Controls
        setCurrentTap={setCurrentTapState}
        currentTap={currentTapState}
        postsCount={userBasicData?.counts?.postCount}
        followersCount={userBasicData?.counts?.followerCount}
        followingCount={userBasicData?.counts?.followingCount}
        // postsCount={userPostsList.length}
        // followersCount={userFollowersList.length}
        // followingCount={userFollowingList.length}
      />
      {currentTapState === 'posts' && (
        <Posts loading={loadingState} posts={userPostsList} />
      )}
      {currentTapState === 'following' && (
        <FollowList
          caseScenario={"This user isn't following anyone yet"}
          membersList={userFollowingList}
          loading={loadingState}
          setRefetchState={setRefetchState}
        />
      )}
      {currentTapState === 'followers' && (
        <FollowList
          caseScenario={'This user have no followers yet'}
          membersList={userFollowersList}
          loading={loadingState}
          setRefetchState={setRefetchState}
        />
      )}
    </Page>
  );
};

export default Profile;
