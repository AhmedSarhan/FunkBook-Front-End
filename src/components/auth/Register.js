import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
const Register = () => {
  const { register, reset, handleSubmit, errors } = useForm();
  const [errorMessages, setErrorMessages] = useState([]);
  const registerHandler = async (data, e) => {
    e.preventDefault();
    console.log(data);
    let newUser = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    await axios
      .post('http://localhost:4000/register', { ...newUser })
      .then((res) => {
        console.log(res);
        e.target.reset();
      })
      .catch((err) => {
        setErrorMessages([...err.response.data]);
        console.log(err.response.data);
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit(registerHandler)}>
        <div className="form-group">
          <label htmlFor="username-register" className="text-muted mb-1">
            <small>Username</small>
          </label>
          <input
            id="username-register"
            name="username"
            className="form-control"
            type="text"
            placeholder="Pick a username"
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
        <div className="form-group">
          <label htmlFor="email-register" className="text-muted mb-1">
            <small>Email</small>
          </label>
          <input
            id="email-register"
            name="email"
            className="form-control"
            type="email"
            placeholder="you@example.com"
            autoComplete="off"
            ref={register({
              required: 'please enter your email first',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            })}
          />
          {errors.email && (
            <small className="d-block text-danger">
              {errors.email.message}
            </small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password-register" className="text-muted mb-1">
            <small>Password</small>
          </label>
          <input
            id="password-register"
            name="password"
            className="form-control"
            type="password"
            placeholder="Create a password"
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
        <button
          type="submit"
          className="py-3 mt-4 btn btn-lg btn-success btn-block"
        >
          Sign up for ComplexApp
        </button>

        {errorMessages.length > 0 && (
          <>
            {errorMessages.map((message) => {
              return (
                <small key={message} className="d-block my-2 text-danger">
                  {message}
                </small>
              );
            })}
          </>
        )}
      </form>
    </>
  );
};

export default Register;
