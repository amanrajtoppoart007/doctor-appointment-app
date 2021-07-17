import {USER_PROFILE} from '../types/userTypes';

const initialState = {
  userProfile: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
