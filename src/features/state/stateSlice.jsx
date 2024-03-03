import { createSlice } from "@reduxjs/toolkit";
import data from "../../../data.json"

// Initial state of the Redux store
const initialState = {
    filterBy: 'All', // Default filter option
    isUpvoted: [], // Array to store upvoted feedback IDs
    sortBy: 'Most Upvotes', // Default sorting option
    data // Initial data from JSON file
}

// Creating a Redux slice
export const stateSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {
        // Reducer function to handle sorting
        sort: (state, action) => {
            state.sortBy = action.payload;
        },
        // Reducer function to handle filtering
        filter: (state, action) => {
            state.filterBy = action.payload;
        },
        // Reducer function to add a new feedback
        add: (state, action) => {
            // Adding a new feedback to the productRequests array
            state.data.productRequests.push({
                id: action.payload.id,
                title: action.payload.title,
                category: action.payload.category,
                description: action.payload.description
            });
        },
        // Reducer function to add a new comment
        addcomment: (state, action) => {
            const { id, content } = action.payload;
            const productRequest = state.data.productRequests[id];
            // Checking if the product request exists
            if (productRequest) {
                if (!productRequest.comments) {
                    productRequest.comments = [];
                }
                // Adding the new comment to the comments array of the product request
                productRequest.comments.push({
                    content: content,
                    user: state.data.currentUser
                });
            }
        },
        // Reducer function to edit a feedback
        edit: (state, action) => {
            const { id, title, category, description, status } = action.payload;
            const productRequest = state.data.productRequests[id];
            // Editing the properties of the feedback
            if (productRequest) {
                productRequest.title = title;
                productRequest.category = category;
                productRequest.description = description;
                productRequest.status = status;
            }
        },
        // Reducer function to delete a feedback
        deletefeedback: (state, action) => {
            // Removing the feedback from the productRequests array
            state.data.productRequests.splice(action.payload, 1);
        },
        // Reducer function to handle upvoting
        upvote: (state, action) => {
            const { id } = action.payload;
            const isAlreadyUpvoted = state.isUpvoted.includes(id);
            // Checking if the feedback has already been upvoted
            if (!isAlreadyUpvoted) {
                const productRequest = state.data.productRequests.find(request => request.id === id);
                if (productRequest) {
                    // Incrementing the upvotes count and adding the feedback ID to the list of upvoted IDs
                    productRequest.upvotes = (productRequest.upvotes || 0) + 1;
                    state.isUpvoted.push(id);
                }
            }
        },
        // Reducer function to handle replying to a comment or a reply
        reply: (state, action) => {
            const { id1, commentId, replyId, content } = action.payload;
            const feedback = state.data.productRequests.find(feedback => feedback.id === id1);
            if (feedback) {
                if (replyId) {
                    // Replying to a reply
                    const comment = feedback.comments.find(comment => comment.id === commentId);
                    if (comment) {
                        const reply = comment.replies.find(reply => reply.id === replyId);
                        if (reply) {
                            if (!reply.replies) {
                                reply.replies = [];
                            }
                            // Adding a nested reply
                            const userBeingRepliedTo = reply.user.username;
                            const newReply = {
                                id: reply.replies.length + 1,
                                content,
                                user: state.data.currentUser,
                                replyingTo: userBeingRepliedTo
                            };
                            reply.replies.push(newReply);
                        } else {
                            console.error("Reply not found");
                        }
                    } else {
                        console.error("Comment not found");
                    }
                } else {
                    // Replying to a comment
                    const comment = feedback.comments.find(comment => comment.id === commentId);
                    if (comment) {
                        if (!comment.replies) {
                            comment.replies = [];
                        }
                        // Adding a reply to a comment
                        const userBeingRepliedTo = comment.user.username;
                        const newReply = {
                            id: comment.replies.length + 1,
                            content,
                            user: state.data.currentUser,
                            replyingTo: userBeingRepliedTo
                        };
                        comment.replies.push(newReply);
                    } else {
                        console.error("Comment not found");
                    }
                }
            } else {
                console.error("Feedback not found");
            }
        }
    }
});

// Exporting actions and reducer
export const { sort, filter, add, addcomment, deletefeedback, edit, upvote, reply } = stateSlice.actions;
export default stateSlice.reducer;
