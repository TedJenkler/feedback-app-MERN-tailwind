import { createSlice } from "@reduxjs/toolkit";
import data from "../../../data.json"

const initialState = {
    filterBy: 'All',
    isUpvoted: [],
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
                productRequest.comments.push({
                    content: content,
                    user: state.data.currentUser
                });
            }
        },
        edit: (state, action) => {
            const { id, title, category, description, status } = action.payload;
            const productRequest = state.data.productRequests[id];
            if (productRequest) {
                productRequest.title = title;
                productRequest.category = category;
                productRequest.description = description;
                productRequest.status = status;
            }
        },
        deletefeedback: (state, action) => {
            state.data.productRequests.splice(action.payload, 1)
        },
        upvote: (state, action) => {
            const { id } = action.payload;
            const isAlreadyUpvoted = state.isUpvoted.includes(id);
            if (!isAlreadyUpvoted) {
                const productRequest = state.data.productRequests.find(request => request.id === id);
                if (productRequest) {
                    productRequest.upvotes = (productRequest.upvotes || 0) + 1;
                    state.isUpvoted.push(id);
                }
            }
        },
        reply: (state, action) => {
            const { id1, commentId, content } = action.payload;
            const feedback = state.data.productRequests.find(feedback => feedback.id === id1);
            if (feedback) {
                const comment = feedback.comments.find(comment => comment.id === commentId);
                if (comment) {
                    if (!comment.replies) {
                        comment.replies = [];
                    }
                    const newReply = {
                        id: comment.replies.length + 1,
                        content,
                        user: state.data.currentUser
                    };
                    comment.replies.push(newReply);
                } else {
                    console.error("Comment not found");
                }
            } else {
                console.error("Feedback not found");
            }
        }
    }
})

export const { sort, filter, add, addcomment, deletefeedback, edit, upvote, reply } = stateSlice.actions

export default stateSlice.reducer