import React, { useContext, useEffect, useState } from 'react';
import Page from '../components/HOC/Page';
import { useParams, Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import ReactToolTip from 'react-tooltip';
import LoadingDots from '../components/Navigation/LoadingDots';
import { AppContext } from '../context/AppContext';
const SinglePost = () => {
  const params = useParams();
  const history = useHistory();
  const { createFlashMessagesHandler } = useContext(AppContext);
  const postId = params.id;
  const [postState, setPostState] = useState(null);
  const [loadingState, setLoadingState] = useState(true);
  const serverRequest = axios.CancelToken.source();
  useEffect(() => {
    if (postId) {
      loadPost();
    }
    return () => {
      serverRequest.cancel();
    };
  }, [postId]);
  const loadPost = async () => {
    await axios
      .get(`/post/${postId}`, { cancelToken: serverRequest.token })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setPostState({ ...res.data });
        }
        setLoadingState(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const isOwner = () => {
    let currentUser = localStorage.getItem('socialMediaUsername');
    console.log(currentUser);
    console.log(postState.author.username);
    if (currentUser && currentUser === postState.author.username) {
      return true;
    }
    return false;
  };
  const deleteHandler = async () => {
    const deleteConfirmation = window.confirm(
      'Do you really want to delete this post'
    );
    if (deleteConfirmation) {
      await axios
        .delete(`/post/${postState._id}`, {
          data: { token: localStorage.getItem('socialMediaToken') },
        })
        .then((res) => {
          if (res.data) {
            history.push(
              `/profile/${localStorage.getItem('socialMediaUsername')}`
            );
            createFlashMessagesHandler({
              title: 'Post Deleted successfully',
              duration: 5,
              type: 'info',
            });
            // setTimeout(() => {
            //
            // }, 1500);
          }
        })
        .catch((err) => {
          createFlashMessagesHandler({
            title: err,
            duration: 5,
            type: 'info',
          });
        });
    }
  };
  if (loadingState) {
    return <LoadingDots />;
  }
  return (
    <Page title={postState ? postState?.title : 'post'}>
      {postState ? (
        <>
          <div className="d-flex justify-content-between">
            <h2>{postState.title}</h2>
            {isOwner() && (
              <span className="pt-2">
                <Link
                  to={`/edit-post/${postState._id}`}
                  data-tip="Edit Post"
                  data-for="edit"
                  className="text-primary mr-2"
                >
                  <i className="fas fa-edit"></i>
                </Link>
                <ReactToolTip id="edit" className="custom-tooltip" />
                <a
                  className="delete-post-button text-danger"
                  data-tip="Delete Post"
                  data-for="delete"
                  onClick={deleteHandler}
                >
                  <i className="fas fa-trash"></i>
                </a>
                <ReactToolTip id="delete" className="custom-tooltip" />
              </span>
            )}
          </div>

          <p className="text-muted small mb-4">
            <Link to={`/profile/${postState.author.username}`}>
              <img className="avatar-tiny" src={postState.author.avatar} />
            </Link>
            Posted by{' '}
            <Link to={`/profile/${postState.author.username}`}>
              {postState.author.username}{' '}
            </Link>{' '}
            on <br />{' '}
            {moment(postState.createdDate).format('yyyy/MM/DD  hh:MM:SS a')}
          </p>

          <div className="body-content">
            <p>{postState.body}</p>
          </div>
        </>
      ) : (
        <>
          <h4 className="text-center my-5">No such post exists</h4>
        </>
      )}
    </Page>
  );
};

export default SinglePost;
