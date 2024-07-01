import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

export const getPostById = createAsyncThunk(
  'post/getById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:2000/post/${id}`);
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
      const response = await axios.get('http://localhost:2000/category/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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

export const getAllComments = createAsyncThunk(
  'comment/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:2000/comment/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllReplies = createAsyncThunk(
  'reply/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:2000/reply/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'user/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:2000/users');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const replyUser = createAsyncThunk(
  'reply/addReply',
  async ({ id, content, user, replyType }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:2000/reply/add/${id}`, { content, user, replyType });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addComment = createAsyncThunk(
    'comment/addComment',
    async ({ content, user, postId }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:2000/comment/add/', {
                content,
                user,
                postId
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const editPost = createAsyncThunk(
  'post/edit',
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:2000/post/update/${id}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  'post/delete',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:2000/post/delete/${id}`)
      return response.data;
    }catch(error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addPost = createAsyncThunk(
  'post/add',
  async ( formData , { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:2000/post/add', formData);
      return response.data;
    }catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const socialSlice = createSlice({
  name: 'social',
  initialState: {
    posts: [],
    categories: [],
    comments: [],
    replies: [],
    users: [],
    selectedPost: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload.posts;
        state.error = null;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(upvoteToggle.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(upvoteToggle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(upvoteToggle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getAllCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload.categories;
        state.error = null;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getAllComments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload.comments;
        state.error = null;
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.users;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(replyUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(replyUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(replyUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getAllReplies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllReplies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.replies = action.payload.replies;
        state.error = null;
      })
      .addCase(getAllReplies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addComment.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getPostById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedPost = action.payload.post;
        state.error = null;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(editPost.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPost.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});

export default socialSlice.reducer;