import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

const Login = () => {
  const { toggleLoginState, createFlashMessagesHandler } = useContext(
    AppContext
  );
  const { register, reset, handleSubmit, errors } = useForm();
  const loginHandler = async (data, e) => {
    e.preventDefault();
    console.log(data);
    let loginData = {
      username: data.username,
      password: data.password,
    };
    await axios
      .post('http://localhost:4000/login', { ...loginData })
      .then((res) => {
        if (res.data) {
          localStorage.setItem('socialMediaToken', res.data.token);
          localStorage.setItem('socialMediaUsername', res.data.username);
          localStorage.setItem('socialMediaAvatar', res.data.avatar);
          e.target.reset();
          toggleLoginState(true);
        } else {
          createFlashMessagesHandler({
            title: 'Invalid Credentials, please try again',
            duration: 5,
            type: 'danger',
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <form className="mb-0 pt-2 pt-md-0" onSubmit={handleSubmit(loginHandler)}>
        <div className="row align-items-center">
          <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
            <input
              name="username"
              className="form-control form-control-sm input-dark"
              id="username_login"
              type="text"
              placeholder="Username"
              autoComplete="off"
              ref={register({
                required: 'please enter your username first',
                minLength: {
                  value: 3,
                  message: "Usernames can't be shorter than 3 characters",
                },
              })}
            />
            {errors.username && (
              <small className="d-block text-danger">
                {errors.username.message}
              </small>
            )}
          </div>
          <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
            <input
              name="password"
              id="password_login"
              className="form-control form-control-sm input-dark"
              type="password"
              placeholder="Password"
              ref={register({
                required: 'please enter your password first',
                minLength: {
                  value: 8,
                  message: "passwords can't be shorter than 8 characters",
                },
              })}
            />
            {errors.password && (
              <small className="d-block text-danger">
                {errors.password.message}
              </small>
            )}
          </div>
          <div className="col-md-auto">
            <button className="btn btn-success btn-sm">Sign In</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
