import React, { useContext, useEffect, useState, useRef } from 'react';
import { AppContext } from '../../context/AppContext';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const Chat = () => {
  const { toggleChat, isChatOpen, incrementUnreadMessages } = useContext(
    AppContext
  );
  const socket = useRef(null);

  const { register, handleSubmit, reset } = useForm();
  const [chatMessages, setChatMessages] = useState([]);
  const user = {
    username: localStorage.getItem('SocialMediaUsername'),
    avatar: localStorage.getItem('socialMediaAvatar'),
    token: localStorage.getItem('socialMediaToken'),
  };
  const chatLog = useRef(null);
  useEffect(() => {
    socket.current = io('http://localhost:4000');

    socket.current.on('chatFromServer', (message) => {
      setChatMessages([...chatMessages, message]);
    });

    if (chatMessages.length > 0 && !isChatOpen) {
      incrementUnreadMessages();
      console.log('rrrr');
    }

    return () => socket.current.disconnect();
  }, [chatMessages]);

  useEffect(() => {
    chatLog.current.scrollTop = chatLog.current.scrollHeight;
  }, [chatMessages]);

  const sendMessageHandler = async ({ message }, e) => {
    console.log(message);
    setChatMessages([
      ...chatMessages,
      { message: message, username: user.username, avatar: user.avatar },
    ]);
    socket.current.emit('chatFromBrowser', {
      message: message,
      token: user.token,
    });
    e.target.reset();
  };
  return (
    <div
      id="chat-wrapper"
      className={
        'chat-wrapper shadow border-top border-left border-right ' +
        (isChatOpen ? 'chat-wrapper--is-visible' : '')
      }
    >
      <div className="chat-title-bar bg-primary">
        Chat
        <span
          className="chat-title-bar-close"
          onClick={() => toggleChat(false)}
        >
          <i className="fas fa-times-circle"></i>
        </span>
      </div>
      <div id="chat" className="chat-log" ref={chatLog}>
        {chatMessages.map((message, index) => {
          if (message.username === user.username) {
            // console.log('doing it');
            return (
              <div className="chat-self" key={index}>
                <div className="chat-message">
                  <div className="chat-message-inner">{message.message}</div>
                </div>
                <img className="chat-avatar avatar-tiny" src={message.avatar} />
              </div>
            );
          }

          return (
            <div className="chat-other" key={index}>
              <Link to={`/profile/${message.username}`}>
                <img className="avatar-tiny" src={message.avatar} />
              </Link>
              <div className="chat-message">
                <div className="chat-message-inner">
                  <Link to={`/profile/${message.username}`}>
                    <strong>{message.username}: </strong>
                  </Link>
                  {message.message}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <form
        id="chatForm"
        className="chat-form border-top"
        onSubmit={handleSubmit(sendMessageHandler)}
      >
        <input
          type="text"
          className="chat-field"
          id="chatField"
          placeholder="Type a message…"
          autoComplete="off"
          name="message"
          ref={register({
            required: true,
          })}
        />
      </form>
    </div>
  );
};

export default Chat;
