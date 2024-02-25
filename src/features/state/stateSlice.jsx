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
        },
        addcomment: (state, action) => {
            const { id, content } = action.payload;
            const productRequest = state.data.productRequests[id];
            if (productRequest) {
                if (!productRequest.comments) {
                    productRequest.comments = [];
                }
                productRequest.comments.push({content: content, user: {"image": "./assets/user-images/admin.jpg" ,name: "admin", username:"admin"}});
            }
        },
        edit: (state, action) => {
            state.data.productRequests[action.payload.id] = {title: action.payload.title, category: action.payload.category, description: action.payload.description, status: action.payload.status, upvotes: state.data.productRequests[action.payload.id].upvotes, comments: state.data.productRequests[action.payload.id].upvotes}
        },
        deletefeedback: (state, action) => {
            state.data.productRequests.splice(action.payload, 1)
        },
    }
})

export const { sort, filter, add, addcomment, deletefeedback, edit } = stateSlice.actions

export default stateSlice.reducer