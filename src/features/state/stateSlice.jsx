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
        },
        add: (state, action) => {
            state.data.productRequests.push({id: action.payload.id, title: action.payload.title, category: action.payload.category, description: action.payload.description})
        }
    }
})

export const { sort, filter, add } = stateSlice.actions

export default stateSlice.reducer