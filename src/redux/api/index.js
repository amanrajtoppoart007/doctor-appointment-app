export const BASE_URL = 'https://telemed.aspmedic.com';
export const PATIENT_VERSION = `${BASE_URL}/API/patient/`;
export const DOCTOR_VERSION = `${BASE_URL}/API/docotor/`;
export const MODULE_VERSION = `${BASE_URL}/API/`;

//Auth URL
export const LOGIN = `${DOCTOR_VERSION}docotorlogin`;
export const FORGOTPASSWORD = `${DOCTOR_VERSION}forgot`;
export const FORGOTPASSWORD_UPDATE = `${DOCTOR_VERSION}resetpassword`;

//Appointment
export const TOGGLE_DOCTOR_STATUS = `${DOCTOR_VERSION}statusline`;
export const GET_APPROVED_APPOINMENT = `${DOCTOR_VERSION}doctorconfirmappointment`;
export const GET_CANCELLED_APPOINMENT = `${DOCTOR_VERSION}doctorcancelappointment`;
export const GET_PAST_APPOINMENT = `${DOCTOR_VERSION}treatmentcomplete`;
export const GET_WAITING_APPOINMENT = `${DOCTOR_VERSION}doctorappointmentpending`;
export const APPOINTMENT_STATUS_UPDATE = `${DOCTOR_VERSION}statusupdate`;
export const DOCTOR_AVAILABLE_TIMING = `${DOCTOR_VERSION}getAvailableSlotByDoctorByDateByAppointmentIdByJason`;
export const APPOINTMENT_RESHEDULE = `${DOCTOR_VERSION}doctorreschedule`;
export const GET_KNOW_YOUR_APPOINTMENT = `${DOCTOR_VERSION}doctorappointment`;
export const GET_SPECIALITYS = `${PATIENT_VERSION}speciality_info`;
export const PATIENT_HISTORY = `${PATIENT_VERSION}historyView`;
export const APPOINTMENT_COMPLETED = `${DOCTOR_VERSION}treatmentcomplete`;

//Product
export const GET_PRODUCT_CATEGORY = `${MODULE_VERSION}Product/view_category`;
export const GET_PRODUCT_ITEMS = `${MODULE_VERSION}Product/product_list`;
export const SAVE_TO_CART = `${MODULE_VERSION}cart/savecart`;
export const GET_CART_ITEMS = `${MODULE_VERSION}cart/view_cart`;
export const COUNT_OF_CALCULATION = `${MODULE_VERSION}cart/countofcalculation`;
export const CART_ITEM_DECREMENT = `${MODULE_VERSION}cart/cart_decrement`;
export const CART_ITEM_INCREMENT = `${MODULE_VERSION}cart/cart_increment`;
export const CART_CHECKOUT = `${MODULE_VERSION}cart/countofcalculation`;
export const ORDER_PLACE = `${DOCTOR_VERSION}orderinfo`;
export const ORDER_HISTORY = `${MODULE_VERSION}cart/orderhistory`;

//User
export const PROFILE = `${DOCTOR_VERSION}docotorprofile_info`;
export const PROFILE_UPDATE = `${DOCTOR_VERSION}docotor_profile_update`;
export const DOCTOR_PREFERRED_TIMING = `${DOCTOR_VERSION}docotor_time`;
export const DOCTOR_LEAVE_UPDATE = `${DOCTOR_VERSION}doctorleave`;
export const DOCTOR_PRICE_UPDATE = `${DOCTOR_VERSION}priceupdate`;
export const DOCTOR_PASSWORD_UPDATE = `${DOCTOR_VERSION}passwordupdate`;

//Payment
export const PAYMENT_URL =
  'https://app.aspmedic.com/payment/doPayment?callback_url=https://app.aspmedic.com/payment/testCallback';

//Web URL
export const ABOUT_US = 'https://www.aspmedic.com/#about-us';
export const CONTACT_US = 'https://www.aspmedic.com/#our-team';

//Video Conferance
export const VONAGE_API_KEY = '47220094';
