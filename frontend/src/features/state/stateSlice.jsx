import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterBy: 'All',
  sortBy: 'Most Upvotes',
};

export const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    sort: (state, action) => {
      state.sortBy = action.payload;
    },
    filter: (state, action) => {
      state.filterBy = action.payload;
    },
  },
});

export const { sort, filter } = stateSlice.actions;
export default stateSlice.reducer;
