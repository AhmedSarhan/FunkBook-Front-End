import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { AppContext } from '../../context/AppContext';

const Page = (props) => {
  useEffect(() => {
    document.title = `${props.title} | ComplexApp`;
    window.scrollTo(0, 0);
  }, [props.title]);
  const {
    loggedInState,
    toggleLoginState,
    createFlashMessagesHandler,
  } = useContext(AppContext);
  const token = localStorage.getItem('socialMediaToken');
  const history = useHistory();
  useEffect(() => {
    if (!loggedInState) {
      history.push('/');
    }
  }, [loggedInState]);

  useEffect(() => {
    checkTokenValidationHandler();
  }, [history]);

  const checkTokenValidationHandler = async () => {
    await axios
      .post('checkToken', { token: token })
      .then((res) => {
        console.log(res.data);
        if (res.data === true) {
          return;
        } else if (loggedInState === true) {
          toggleLoginState(false);
          localStorage.removeItem('socialMediaToken');
          localStorage.removeItem('socialMediaUsername');
          localStorage.removeItem('socialMediaAvatar');
          createFlashMessagesHandler({
            title: 'Your session has expired, please log in again',
            duration: 5,
            type: 'info',
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container container--narrow py-md-5">{props.children}</div>
  );
};

export default Page;
