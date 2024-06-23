import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { upvote } from "../state/stateSlice";

export const getAllPosts = createAsyncThunk(
    'post/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:2000/post/');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllCategories = createAsyncThunk(
    'category/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:2000/category/')
            return response.data;
        }catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const upvoteToggle = createAsyncThunk(
  'post/upvote',
  async ({ toggle, id, username }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:2000/post/upvote/${id}`, { toggle, username });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const socialSlice = createSlice({
    name: 'social',
    initialState: {
        posts: [],
        categories: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload.posts
                state.error = null
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(upvoteToggle.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(upvoteToggle.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null
            })
            .addCase(upvoteToggle.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getAllCategories.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload.categories
                state.error = null
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export default socialSlice.reducer;