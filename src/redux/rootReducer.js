import {combineReducers} from 'redux';

import authReducer from './reducers/authReducer';
import appointmentReducer from './reducers/appoinmentReducer';
import productReducer from './reducers/productReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  appointment: appointmentReducer,
  product: productReducer,
  user: userReducer,
});

export default rootReducer;
