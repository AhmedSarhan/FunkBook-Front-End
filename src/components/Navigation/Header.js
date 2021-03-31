import React, { useContext } from 'react';
import '../../App.css';
import { NavLink } from 'react-router-dom';
import Login from '../auth/Login';
import LoggedIn from '../auth/LoggedIn';
import { AppContext } from '../../context/AppContext';
const Header = () => {
  const { loggedInState } = useContext(AppContext);

  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <NavLink to="/" className="text-white">
            ComplexApp
          </NavLink>
        </h4>
        {loggedInState ? <LoggedIn /> : <Login />}
      </div>
    </header>
  );
};

export default Header;
