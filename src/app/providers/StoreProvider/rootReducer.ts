import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../../../entities/Auth/model/slice';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
