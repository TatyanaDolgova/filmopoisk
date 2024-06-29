import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  RootState,
  AppDispatch,
} from '../../../app/providers/StoreProvider/store';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  status: 'idle',
  token: null,
};

export const login = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { dispatch: AppDispatch; state: RootState }
>('auth/login', async (credentials: LoginCredentials) => {
  const response = await fetch('http://localhost:3030/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data: LoginResponse = await response.json();
  if (response.status === 200) {
    localStorage.setItem('token', data.token);
  }
  return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuth(state) {
      const token = localStorage.getItem('token');
      if (token) {
        state.isAuthenticated = true;
        state.token = token;
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('rate2024');
    },
  },
});

export const { logout, checkAuth } = authSlice.actions;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export default authSlice.reducer;
