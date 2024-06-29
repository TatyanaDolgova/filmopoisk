import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../../../entities/Auth/model/slice';
import filterReducer, {
  FilterState,
} from '../../../pages/HomePage/model/slice';
import movieApi from '../../../shared/api/api';

const rootReducer = combineReducers({
  auth: authReducer,
  filters: filterReducer,
  [movieApi.reducerPath]: movieApi.reducer,
});

export type RootState = {
  auth: ReturnType<typeof authReducer>;
  filters: FilterState;
  [movieApi.reducerPath]: ReturnType<typeof movieApi.reducer>;
};

export default rootReducer;
