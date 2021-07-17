import Toast from 'react-native-simple-toast';

import {authApi} from '../api/apiConfig';
import {LOGIN, FORGOTPASSWORD, FORGOTPASSWORD_UPDATE} from '../api';
import {
  storeObjectData,
  USER_DATA,
  USER_CREDENTIALS,
} from '../../utils/localStorage';
import {
  USER_DATA as USER_DATA_STORAGE,
  STORE_USER_CREDENTIALS,
} from '../types/authTypes';

export const login = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(LOGIN, requestData)
      .then(response => {
        if (response.status === 200) {
          dispatch(storeUserData(response.data));
          storeObjectData(USER_DATA, response.data);
          storeObjectData(USER_CREDENTIALS, requestData);
          dispatch(storeUserCred(requestData));
          onSuccess(response.data);
          Toast.show(response.data.message, Toast.LONG);
        } else {
          onError(response.data);
          Toast.show(response.data, Toast.LONG);
        }
      })
      .catch(error => {
        onError(error);
        Toast.show(error.message, Toast.LONG);
      });
  };
};

export const forgotPassword = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(FORGOTPASSWORD, requestData)
      .then(response => {
        console.log(response.data);
        if (response.status === 200 && response.data.code === 1) {
          onSuccess(response.data);
        } else {
          onError(response.data);
          Toast.show('Invalid email address', Toast.LONG);
        }
      })
      .catch(error => {
        onError(error);
        Toast.show(error.message, Toast.LONG);
      });
  };
};

export const forgotPasswordUpdate = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(FORGOTPASSWORD_UPDATE, requestData)
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          onSuccess(response.data);
          Toast.show('Password reset successfully', Toast.LONG);
        } else {
          onError(response.data);
          Toast.show(response.data, Toast.LONG);
        }
      })
      .catch(error => {
        onError(error);
        Toast.show(error.message, Toast.LONG);
      });
  };
};

export const storeUserData = userData => {
  return {
    type: USER_DATA_STORAGE,
    payload: userData,
  };
};

export const storeUserCred = userData => {
  return {
    type: STORE_USER_CREDENTIALS,
    payload: userData,
  };
};
