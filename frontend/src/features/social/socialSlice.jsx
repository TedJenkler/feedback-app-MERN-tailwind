import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://feedback-app-mern-tailwind.onrender.com'
    : 'http://localhost:5000';

const handleAsyncError = error => {
  if (error.response) {
    return error.response.data;
  }
  return error.message;
};

export const getAllPosts = createAsyncThunk(
  'post/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/post/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const getPostById = createAsyncThunk(
  'post/getById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/post/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const getAllCategories = createAsyncThunk(
  'category/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/category/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const upvoteToggle = createAsyncThunk(
  'post/upvote',
  async ({ toggle, id, username }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/post/upvote/${id}`, {
        toggle,
        username,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const getAllComments = createAsyncThunk(
  'comment/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/comment/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const getAllReplies = createAsyncThunk(
  'reply/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reply/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'user/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const replyUser = createAsyncThunk(
  'reply/addReply',
  async ({ id, content, user, replyType }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reply/add/${id}`, {
        content,
        user,
        replyType,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const addComment = createAsyncThunk(
  'comment/addComment',
  async ({ content, user, postId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/comment/add/`, {
        content,
        user,
        postId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const editPost = createAsyncThunk(
  'post/edit',
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/post/update/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const deletePost = createAsyncThunk(
  'post/delete',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/post/delete/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const addPost = createAsyncThunk(
  'post/add',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/post/add`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

const socialSlice = createSlice({
  name: 'social',
  initialState: {
    auth: { loggedIn: false, user: undefined, token: undefined },
    posts: [],
    categories: [],
    comments: [],
    replies: [],
    users: [],
    selectedPost: [],
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
          if (action.type === getAllPosts.fulfilled.type) {
            state.posts = action.payload.posts;
          } else if (action.type === getPostById.fulfilled.type) {
            state.selectedPost = action.payload.post;
          } else if (action.type === getAllCategories.fulfilled.type) {
            state.categories = action.payload.categories;
          } else if (action.type === getAllComments.fulfilled.type) {
            state.comments = action.payload.comments;
          } else if (action.type === getAllReplies.fulfilled.type) {
            state.replies = action.payload.replies;
          } else if (action.type === getAllUsers.fulfilled.type) {
            state.users = action.payload.users;
          }
          state.error = null;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export default socialSlice.reducer;
