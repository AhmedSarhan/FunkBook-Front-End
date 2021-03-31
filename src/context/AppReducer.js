import { ActionTypes } from './utils';
export const AppReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_FLASH_MESSAGE:
      return { ...state, flashMessage: { ...action.payload } };
    case ActionTypes.SWITCH_LOGIN:
      return { ...state, loggedInState: action.payload };
    case ActionTypes.SEARCH_TOGGLE:
      return { ...state, isSearchOpen: action.payload };
    case ActionTypes.CHAT_TOGGLE:
      return { ...state, isChatOpen: action.payload };
    case ActionTypes.INCREMENT_UNREAD_MESSAGES:
      let oldCount = state.unReadChatMessages;
      let newCount = oldCount + 1;
      console.log('running');
      console.log('old', oldCount);
      console.log('new', newCount);
      return { ...state, unReadChatMessages: newCount };
    case ActionTypes.CLEAR_UNREAD_MESSAGES:
      return { ...state, unReadChatMessages: 0 };
    default:
      return state;
  }
};
