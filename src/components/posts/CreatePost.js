import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
const CreatePost = ({ editedPost }) => {
  const { createFlashMessagesHandler } = useContext(AppContext);
  const { register, reset, errors, handleSubmit, setValue } = useForm();
  const history = useHistory();
  const serverRequest = axios.CancelToken.source();
  useEffect(() => {
    if (editedPost) {
      setValue('title', editedPost.title);
      setValue('body', editedPost.body);
      console.log(editedPost);
    }
    return () => {
      serverRequest.cancel();
    };
  }, [editedPost]);
  const createPostHandler = (data, e) => {
    console.log(data);
    axios
      .post(
        '/create-post',
        {
          title: data.title,
          body: data.body,
          token: localStorage.getItem('socialMediaToken'),
        },
        { cancelToken: serverRequest.token }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          let newPostId = res.data;
          history.push(`/post/${newPostId}`);
          createFlashMessagesHandler({
            title: 'Post Added Successfully',
            duration: 5,
            type: 'success',
          });
        }
      })
      .catch((err) => {
        console.log(err);
        createFlashMessagesHandler({
          title: err?.response?.message,
          duration: 5,
          type: 'danger',
        });
      });
  };
  const editPostHandler = (data, e) => {
    axios
      .post(
        `/post/${editedPost._id}/edit`,
        {
          title: data.title,
          body: data.body,
          token: localStorage.getItem('socialMediaToken'),
        },
        { cancelToken: serverRequest.token }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          // let newPostId = res.data;
          console.log('moving on');
          history.push(`/post/${editedPost._id}`);
          createFlashMessagesHandler({
            title: 'Post updated Successfully',
            duration: 5,
            type: 'success',
          });
        }
      })
      .catch((err) => {
        console.log(err);
        createFlashMessagesHandler({
          title: err?.response?.message,
          duration: 5,
          type: 'danger',
        });
      });
  };
  return (
    <div className="container container--narrow">
      <form
        onSubmit={handleSubmit(
          editedPost ? editPostHandler : createPostHandler
        )}
      >
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            autoFocus
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
            ref={register({
              required: 'please enter a post title first',
              minLength: {
                value: 6,
                message: "Post titles can't be less than 6 characters",
              },
              maxLength: {
                value: 35,
                message: "Post titles can't be longer than 35 characters",
              },
            })}
          />
          {errors.title && (
            <small className="d-block py-1 my-1 text-center text-danger">
              {errors.title.message}
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
            type="text"
            ref={register({
              required: 'please enter a post body first',
              minLength: {
                value: 20,
                message: "Post body can't be less than 20 characters",
              },
              maxLength: {
                value: 5000,
                message: "Post body can't be longer than 5000 characters",
              },
            })}
          ></textarea>
          {errors.body && (
            <small className="d-block py-1 my-1 text-center text-danger">
              {errors.body.message}
            </small>
          )}
        </div>

        <button type="submit" className="btn btn-primary d-block mx-auto my-5">
          {editedPost ? 'Update Post' : ' Save New Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
