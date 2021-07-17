import Toast from 'react-native-simple-toast';

import {authApi} from '../api/apiConfig';
import {
  TOGGLE_DOCTOR_STATUS,
  GET_APPROVED_APPOINMENT,
  GET_CANCELLED_APPOINMENT,
  GET_PAST_APPOINMENT,
  GET_WAITING_APPOINMENT,
  APPOINTMENT_STATUS_UPDATE,
  DOCTOR_AVAILABLE_TIMING,
  APPOINTMENT_RESHEDULE,
  GET_KNOW_YOUR_APPOINTMENT,
  GET_SPECIALITYS,
  PATIENT_HISTORY,
  APPOINTMENT_COMPLETED,
} from '../api';
import {
  DOCTOR_STATUS,
  APPROVED_APPOINMENT,
  PAST_APPOINMENT,
  CANCELLED_APPOINMENT,
  WAITING_APPOINMENT,
  SLOT_AVAILABLE_TIMING,
  SELECTED_APPOINTMENT,
  KNOW_YOUR_APPOINTMENT,
  SPECIALITY_LIST,
} from '../types/appoinmentTypes';
import {storeObjectData, SPECIALTY_DATA} from '../../utils/localStorage';

export const knowYourAppointment = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(GET_KNOW_YOUR_APPOINTMENT, requestData)
      .then(response => {
        if (
          response.status === 200 &&
          typeof response.data?.message !== 'string' &&
          response.data?.message.length > 0
        ) {
          onSuccess(response.data.message);
          dispatch(storeKnowAppointmentHistory(response.data.message));
        } else {
          onError(response.data);
          dispatch(storeKnowAppointmentHistory([]));
        }
      })
      .catch(error => {
        onError(error);
        Toast.show(error.message, Toast.LONG);
      });
  };
};

export const doctorStatusChange = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(TOGGLE_DOCTOR_STATUS, requestData)
      .then(response => {
        if (response.status === 200) {
          onSuccess(response.data);
          dispatch(storeDoctorStatus(requestData.status === 'ONLINE'));
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

export const approvedAppointmentList = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(GET_APPROVED_APPOINMENT, requestData)
      .then(response => {
        if (
          response.status === 200 &&
          typeof response.data?.message !== 'string' &&
          response.data?.message.length > 0
        ) {
          onSuccess(response.data.message);
          dispatch(storeapprovedAppointmentHistory(response.data.message));
        } else {
          onError(response.data);
          dispatch(storeapprovedAppointmentHistory([]));
        }
      })
      .catch(error => {
        onError(error);
        Toast.show(error.message, Toast.LONG);
      });
  };
};

export const cancelledAppointmentList = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(GET_CANCELLED_APPOINMENT, requestData)
      .then(response => {
        if (
          response.status === 200 &&
          typeof response.data?.message !== 'string' &&
          response.data?.message.length > 0
        ) {
          onSuccess(response.data.message);
          dispatch(storecancelledAppointmentHistory(response.data.message));
        } else {
          onError(response.data);
          dispatch(storecancelledAppointmentHistory([]));
        }
      })
      .catch(error => {
        onError(error);
        Toast.show(error.message, Toast.LONG);
      });
  };
};

export const waitingAppointmentList = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(GET_WAITING_APPOINMENT, requestData)
      .then(response => {
        if (
          response.status === 200 &&
          typeof response.data?.message !== 'string' &&
          response.data?.message.length > 0
        ) {
          onSuccess(response.data.message);
          dispatch(storeWaitingAppointmentHistory(response.data.message));
        } else {
          onError(response.data);
          dispatch(storeWaitingAppointmentHistory([]));
        }
      })
      .catch(error => {
        onError(error);
        Toast.show(error.message, Toast.LONG);
      });
  };
};

export const pastAppointmentList = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(GET_PAST_APPOINMENT, requestData)
      .then(response => {
        if (
          response.status === 200 &&
          typeof response.data?.message !== 'string' &&
          response.data?.message.length > 0
        ) {
          onSuccess(response.data.message);
          dispatch(storepastAppointmentHistory(response.data.message));
        } else {
          onError(response.data);
          dispatch(storepastAppointmentHistory([]));
        }
      })
      .catch(error => {
        onError(error);
        Toast.show(error.message, Toast.LONG);
      });
  };
};

export const appointmentApprove = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(APPOINTMENT_STATUS_UPDATE, requestData)
      .then(response => {
        if (response.status === 200) {
          onSuccess(response.data);
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

export const completeAppointment = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(APPOINTMENT_STATUS_UPDATE, requestData)
      .then(response => {
        if (response.status === 200) {
          onSuccess(response.data);
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

//Reshecule Appointment
export const slotAvailableList = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(DOCTOR_AVAILABLE_TIMING, requestData)
      .then(response => {
        if (
          response.status === 200 &&
          typeof response.data?.aslots !== 'string' &&
          response.data?.aslots.length > 0
        ) {
          onSuccess(response.data.aslots);
          dispatch(storeSlotTiming(response.data.aslots));
        } else {
          dispatch(storeSlotTiming([]));
          onError(response.data);
        }
      })
      .catch(error => {
        onError(error);
      });
  };
};

export const resheduleAppoinment = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(APPOINTMENT_RESHEDULE, requestData)
      .then(response => {
        if (response.status === 200) {
          onSuccess(response.data);
        } else {
          onError(response.data);
        }
      })
      .catch(error => {
        onError(error);
      });
  };
};

export const specialityList = (onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(GET_SPECIALITYS)
      .then(response => {
        if (
          response.status === 200 &&
          typeof response.data?.message !== 'string' &&
          response.data?.message.length > 0
        ) {
          onSuccess(response.data.message);
          storeObjectData(SPECIALTY_DATA, response.data.message);
          dispatch(storeSpecialitsList(response.data.message));
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
          onSuccess(response.data.message);
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

export const storeKnowAppointmentHistory = knowYourAppointment => {
  return {
    type: KNOW_YOUR_APPOINTMENT,
    payload: knowYourAppointment,
  };
};

export const storeSlotTiming = slotTiming => {
  return {
    type: SLOT_AVAILABLE_TIMING,
    payload: slotTiming,
  };
};

export const storeapprovedAppointmentHistory = approvedList => {
  return {
    type: APPROVED_APPOINMENT,
    payload: approvedList,
  };
};

export const storecancelledAppointmentHistory = cancelledList => {
  return {
    type: CANCELLED_APPOINMENT,
    payload: cancelledList,
  };
};

export const storepastAppointmentHistory = pastList => {
  return {
    type: PAST_APPOINMENT,
    payload: pastList,
  };
};

export const storeWaitingAppointmentHistory = waitingList => {
  return {
    type: WAITING_APPOINMENT,
    payload: waitingList,
  };
};

export const storeDoctorStatus = doctorStatus => {
  return {
    type: DOCTOR_STATUS,
    payload: doctorStatus,
  };
};

export const selectedAppointment = selectedAppointment => {
  return {
    type: SELECTED_APPOINTMENT,
    payload: selectedAppointment,
  };
};

export const storeSpecialitsList = specialityList => {
  return {
    type: SPECIALITY_LIST,
    payload: specialityList,
  };
};
