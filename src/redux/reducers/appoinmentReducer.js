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

const initialState = {
  doctorStatus: false,
  approvedAppointment: [],
  pastAppointment: [],
  cancelledAppointment: [],
  waitingAppointment: [],
  slotTiming: [],
  selectedAppointment: {},
  knowYourAppointment: [],
  specalitysList: [],
};

const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case DOCTOR_STATUS:
      return {
        ...state,
        doctorStatus: action.payload,
      };
    case APPROVED_APPOINMENT:
      return {
        ...state,
        approvedAppointment: action.payload,
      };
    case PAST_APPOINMENT:
      return {
        ...state,
        pastAppointment: action.payload,
      };
    case CANCELLED_APPOINMENT:
      return {
        ...state,
        cancelledAppointment: action.payload,
      };
    case WAITING_APPOINMENT:
      return {
        ...state,
        waitingAppointment: action.payload,
      };
    case SLOT_AVAILABLE_TIMING:
      return {
        ...state,
        slotTiming: action.payload,
      };
    case SELECTED_APPOINTMENT:
      return {
        ...state,
        selectedAppointment: action.payload,
      };
    case KNOW_YOUR_APPOINTMENT:
      return {
        ...state,
        knowYourAppointment: action.payload,
      };
    case SPECIALITY_LIST:
      return {
        ...state,
        specalitysList: action.payload,
      };
    default:
      return state;
  }
};

export default appointmentReducer;
