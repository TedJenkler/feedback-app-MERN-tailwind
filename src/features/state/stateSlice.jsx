import { createSlice } from "@reduxjs/toolkit";
import data from "../../../data.json"

const initialState = {
    filterBy: 'Most Upvotes',
    data
}

export const stateSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {
        filter: (state, action) => {
            state.filterBy = action.payload
        }
    }
})

export const { filter } = stateSlice.actions

export default stateSlice.reducer