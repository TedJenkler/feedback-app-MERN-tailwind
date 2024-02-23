import { createSlice } from "@reduxjs/toolkit";
import data from "../../../data.json"

const initialState = {
    sortBy: 'Most Upvotes',
    data
}

export const stateSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {
        sort: (state, action) => {
            state.sortBy = action.payload
        }
    }
})

export const { sort } = stateSlice.actions

export default stateSlice.reducer