import { createContext, useReducer } from 'react';
import axios from 'axios';
import { AppReducer } from './AppReducer';
import { ActionTypes } from './utils';

export const AppContext = createContext();

const initialState = {
  loggedInState: false,
  flashMessage: {
    title: '',
    duration: 0,
    type: 'success',
  },
  isSearchOpen: false,
  isChatOpen: false,
  unReadChatMessages: 0,
};
const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, [], () => {
    let localLoggedInState = Boolean(localStorage.getItem('socialMediaToken'));

    return {
      ...initialState,
      loggedInState: localLoggedInState,
    };
  });

  const createFlashMessagesHandler = (message) => {
    dispatch({
      type: ActionTypes.CREATE_FLASH_MESSAGE,
      payload: message,
    });
  };
  const toggleLoginState = (loginState) => {
    dispatch({
      type: ActionTypes.SWITCH_LOGIN,
      payload: loginState,
    });
  };
  const toggleSearch = (searchOpenState) => {
    dispatch({
      type: ActionTypes.SEARCH_TOGGLE,
      payload: searchOpenState,
    });
  };
  const toggleChat = (chatOpenState) => {
    dispatch({
      type: ActionTypes.CHAT_TOGGLE,
      payload: chatOpenState,
    });
  };
  const incrementUnreadMessages = () => {
    dispatch({
      type: ActionTypes.INCREMENT_UNREAD_MESSAGES,
    });
  };
  const clearUnreadMessages = () => {
    dispatch({
      type: ActionTypes.CLEAR_UNREAD_MESSAGES,
    });
  };
  let contextValues = {
    ...state,
    createFlashMessagesHandler,
    toggleLoginState,
    toggleSearch,
    toggleChat,
    incrementUnreadMessages,
    clearUnreadMessages,
  };
  return (
    <AppContext.Provider value={contextValues}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
