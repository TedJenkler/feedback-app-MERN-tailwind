import { createSlice } from "@reduxjs/toolkit";
import data from "../../../data.json"

const initialState = {
    filterBy: 'All',
    sortBy: 'Most Upvotes',
    data
}

export const stateSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {
        sort: (state, action) => {
            state.sortBy = action.payload
        },
        filter: (state, action) => {
            state.filterBy = action.payload
        }
    }
})

export const { sort, filter } = stateSlice.actions

export default stateSlice.reducer