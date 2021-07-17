import Toast from 'react-native-simple-toast';

import {authApi} from '../api/apiConfig';
import {
  PROFILE,
  PROFILE_UPDATE,
  DOCTOR_PREFERRED_TIMING,
  PATIENT_HISTORY,
  DOCTOR_LEAVE_UPDATE,
  DOCTOR_PRICE_UPDATE,
  DOCTOR_PASSWORD_UPDATE,
} from '../api';
import {USER_PROFILE} from '../types/userTypes';

export const doctorProfile = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(PROFILE, requestData)
      .then(response => {
        if (
          response.status === 200 &&
          typeof response.data?.message !== 'string' &&
          response.data?.message.length > 0
        ) {
          dispatch(storeUserProfileData(response.data.message[0]));
          onSuccess(response.data.message[0]);
        } else {
          onError(response.data);
        }
      })
      .catch(error => {
        onError(error);
        Toast.show(error.message, Toast.LONG);
      });
  };
};

export const doctorProfileUpdate = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(PROFILE_UPDATE, requestData)
      .then(response => {
        if (response.status === 200 && response.data.message) {
          onSuccess(response.data);
          dispatch(storeUserProfileData(requestData));
          Toast.show(response.data.status, Toast.LONG);
        } else {
          onError(response.data);
        }
      })
      .catch(error => {
        onError(error);
        Toast.show(error.message, Toast.LONG);
      });
  };
};

export const savePreferredTiming = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(DOCTOR_PREFERRED_TIMING, requestData)
      .then(response => {
        if (response.status === 200 && response.data.status === 'success') {
          onSuccess(response.data);
          Toast.show(response.data.message, Toast.LONG);
        } else {
          onError(response.data);
        }
      })
      .catch(error => {
        onError(error);
        Toast.show(error.message, Toast.LONG);
      });
  };
};

export const patientHistory = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(PATIENT_HISTORY, requestData)
      .then(response => {
        if (
          response.status === 200 &&
          typeof response.data?.message !== 'string' &&
          response.data?.message.length > 0
        ) {
          onSuccess(response.data);
          Toast.show(response.data.message, Toast.LONG);
        } else {
          onError(response.data);
        }
      })
      .catch(error => {
        onError(error);
        Toast.show(error.message, Toast.LONG);
      });
  };
};

export const doctorLeaveUpdate = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(DOCTOR_LEAVE_UPDATE, requestData)
      .then(response => {
        if (response.status === 200) {
          onSuccess(response.data);
          Toast.show(response.data.status, Toast.LONG);
        } else {
          onError(response.data);
        }
      })
      .catch(error => {
        onError(error);
        Toast.show(error.message, Toast.LONG);
      });
  };
};

export const doctorPriceUpdate = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(DOCTOR_PRICE_UPDATE, requestData)
      .then(response => {
        if (response.status === 200) {
          onSuccess(response.data);
          Toast.show(response.data.status, Toast.LONG);
        } else {
          onError(response.data);
        }
      })
      .catch(error => {
        onError(error);
        Toast.show(error.message, Toast.LONG);
      });
  };
};

export const doctorPasswordUpdate = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(DOCTOR_PASSWORD_UPDATE, requestData)
      .then(response => {
        if (response.status === 200) {
          onSuccess(response.data);
          Toast.show(response.data.status, Toast.LONG);
        } else {
          onError(response.data);
        }
      })
      .catch(error => {
        onError(error);
        Toast.show(error.message, Toast.LONG);
      });
  };
};

export const storeUserProfileData = userData => {
  return {
    type: USER_PROFILE,
    payload: userData,
  };
};
