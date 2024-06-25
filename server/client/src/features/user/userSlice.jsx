import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const login = createAsyncThunk(
    'user/login',
    async (credentials, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:2000/users/login', credentials);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', response.data.user._id);
        localStorage.setItem('username', response.data.user.username);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

export const register = createAsyncThunk(
    'user/register',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:2000/users/register', formData);
            return response.data;
        }catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        activeUser: null,
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.activeUser = action.payload.user.username;
                state.error = null
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(register.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export default userSlice.reducer;