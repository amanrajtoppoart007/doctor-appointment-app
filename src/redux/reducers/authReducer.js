import {USER_DATA, STORE_USER_CREDENTIALS} from '../types/authTypes';

const initialState = {
  userData: {},
  userCred: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case STORE_USER_CREDENTIALS:
      return {
        ...state,
        userCred: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
