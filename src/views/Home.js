import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Feed from '../components/timeline/Feed';
import LoadingDots from '../components/Navigation/LoadingDots';
import Posts from '../components/profile/Posts';
import Page from '../components/HOC/Page';
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedPosts, setFeedPosts] = useState([]);
  const serverRequest = axios.CancelToken.source();

  useEffect(() => {
    fetchFeeds();
    return () => serverRequest.cancel();
  }, []);

  const fetchFeeds = async () => {
    await axios
      .post(
        `/getHomeFeed`,
        {
          token: localStorage.getItem('socialMediaToken'),
        },
        {
          cancelToken: serverRequest.token,
        }
      )
      .then((res) => {
        console.log('followers', res.data);
        if (res.data) {
          setFeedPosts([...res.data]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (isLoading) {
    return <LoadingDots />;
  }
  return (
    <Page title="home page">
      {!isLoading && feedPosts.length > 0 ? (
        <>
          <h2 className="text-center my-3 py-2 text-capitalize text-dark">
            Latest Posts from those you follow
          </h2>
          <Posts posts={feedPosts} loading={isLoading} />
        </>
      ) : (
        <Feed />
      )}
    </Page>
  );
};

export default Home;
