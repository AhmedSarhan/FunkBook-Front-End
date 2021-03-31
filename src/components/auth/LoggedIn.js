import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { AppContext } from '../../context/AppContext';
const LoggedIn = () => {
  const {
    toggleLoginState,
    toggleSearch,
    toggleChat,
    isChatOpen,
    clearUnreadMessages,
    unReadChatMessages,
  } = useContext(AppContext);
  const logOutHandler = () => {
    toggleLoginState(false);
    localStorage.removeItem('socialMediaToken');
    localStorage.removeItem('socialMediaUsername');
    localStorage.removeItem('socialMediaAvatar');
  };
  return (
    <div className="flex-row my-3 my-md-0">
      <a
        onClick={() => toggleSearch(true)}
        className="text-white mr-2 header-search-icon"
        data-for="search"
        data-tip="Search"
      >
        <i className="fas fa-search"></i>
      </a>
      <ReactTooltip place="bottom" id="search" className="custom-tooltip" />
      <span
        className={
          'mr-2 header-chat-icon ' +
          (unReadChatMessages > 0 ? 'text-red' : 'text-white')
        }
        data-for="chat"
        data-tip="Chat"
        onClick={() => {
          toggleChat(!isChatOpen);
          clearUnreadMessages();
        }}
      >
        <i className="fas fa-comment"></i>
      </span>
      <ReactTooltip place="bottom" id="chat" className="custom-tooltip" />

      <Link
        to={`/profile/${localStorage.getItem('socialMediaUsername')}`}
        href="#"
        className="mr-2"
        data-for="avatar"
        data-tip="Profile"
      >
        <img
          className="small-header-avatar"
          src={localStorage.getItem('socialMediaAvatar')}
          //   alt={localStorage.getItem('socialMediaUsername').charAt(0)}
        />
      </Link>
      <ReactTooltip place="bottom" id="avatar" className="custom-tooltip" />

      <Link to="/create-post" className="btn btn-sm btn-success mr-2">
        Create Post
      </Link>
      <button className="btn btn-sm btn-danger" onClick={logOutHandler}>
        Sign Out
      </button>
    </div>
  );
};

export default LoggedIn;
