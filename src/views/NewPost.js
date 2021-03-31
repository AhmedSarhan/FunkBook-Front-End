import React, { useEffect, useState } from 'react';
import Page from '../components/HOC/Page';
import CreatePost from '../components/posts/CreatePost';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
const NewPost = () => {
  const serverRequest = axios.CancelToken.source();
  const [editedPostState, setEditedPostState] = useState(null);
  const [pageTitle, setPageTitle] = useState('Create New Post');
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      fetchEditedPost();
      setPageTitle('Edit Post');

      return () => {
        serverRequest.cancel();
      };
    }
  }, []);
  const fetchEditedPost = async () => {
    await axios
      .get(`/post/${params.id}`, { cancelToken: serverRequest.token })
      .then((res) => {
        if (res.data) {
          setEditedPostState({ ...res.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Page title={pageTitle}>
      {params.id && (
        <Link className="small mt-3 font-weight-bold" to={`/post/${params.id}`}>
          &laquo; Back to post permalink
        </Link>
      )}
      <CreatePost editedPost={editedPostState} />
    </Page>
  );
};

export default NewPost;
