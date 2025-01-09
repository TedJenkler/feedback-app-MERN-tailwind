import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://feedback-app-mern-tailwind.onrender.com'
    : 'http://localhost:5000';

const LOGIN_ENDPOINT = '/users/login';
const REGISTER_ENDPOINT = '/users/register';

export const login = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}${LOGIN_ENDPOINT}`,
        credentials
      );
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.user._id);
      localStorage.setItem('username', response.data.user.username);
      return response.data;
    } catch (error) {
      let errorMsg = 'An unknown error occurred';
      if (error.response && error.response.data) {
        errorMsg =
          error.response.data.message || JSON.stringify(error.response.data);
      } else if (error.message) {
        errorMsg = error.message;
      }
      return rejectWithValue(errorMsg);
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}${REGISTER_ENDPOINT}`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    activeUser: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.status = 'loading';
          state.error = null;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.status = 'succeeded';
          if (action.type === login.fulfilled.type) {
            state.activeUser = action.payload.user.username;
          }
          state.error = null;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload || action.error.message;
        }
      );
  },
});

export default userSlice.reducer;
