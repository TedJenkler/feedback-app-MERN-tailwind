import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../features/social/socialSlice';

function AddComment({ postId }) {
    const dispatch = useDispatch();
    const [commentContent, setCommentContent] = useState('');
    const maxCharacters = 250;
    const username = localStorage.getItem('username');

    const handleInputChange = (e) => {
        const content = e.target.value;
        setCommentContent(content.slice(0, maxCharacters));
    };

    const handlePostComment = (e) => {
        e.preventDefault();
        dispatch(addComment({ content: commentContent, user: username, postId }));
        setCommentContent('');
    };

    const remainingCharacters = maxCharacters - commentContent.length;

    return (
        <div className='bg-white p-6 rounded-xl md:px-8'>
            <h1 className='text-lg tracking-[-0.25px] font-bold text-blue mb-6'>Add Comment</h1>
            <form onSubmit={handlePostComment}>
                <textarea
                    placeholder='Type your comment here'
                    value={commentContent}
                    onChange={handleInputChange}
                    maxLength={maxCharacters}
                    className='bg-grey-white2 w-full h-20 mb-4 text-grey p-4 rounded-xl px-3 focus:outline-strong-blue md:px-15'
                ></textarea>
                <div className='flex items-center justify-between'>
                    <p className='px-3 text-grey font-normal md:px-15'>{remainingCharacters} Characters left</p>
                    <button
                        type="submit"
                        className='bg-purple text-white py-2 px-4 rounded-xl hover:bg-hover-purple md:text-sm'
                    >
                        Post Comment
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddComment;