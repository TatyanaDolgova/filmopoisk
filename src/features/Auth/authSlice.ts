import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: localStorage.getItem('token') || null,
};

export const login = createAsyncThunk<void, void, { state: RootState }>(
  'auth/login',
  async (_, thunkAPI) => {
    localStorage.setItem('token', 'example_token');
    thunkAPI.dispatch(authSlice.actions.setAuthenticated(true));
  }
);

export const logout = createAsyncThunk<void, void, { state: RootState }>(
  'auth/logout',
  async (_, thunkAPI) => {
    localStorage.removeItem('token');
    thunkAPI.dispatch(authSlice.actions.setAuthenticated(false));
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: {},
});

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export default authSlice.reducer;
