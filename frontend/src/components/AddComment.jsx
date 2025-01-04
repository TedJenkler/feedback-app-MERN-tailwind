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
        if (commentContent.trim() === '') return;
        dispatch(addComment({ content: commentContent, user: username, postId }));
        setCommentContent('');
    };

    const remainingCharacters = maxCharacters - commentContent.length;

    return (
        <div className='bg-white p-6 rounded-xl md:px-8'>
            <h1 className='text-lg font-bold text-blue mb-6'>Add Comment</h1>
            <form onSubmit={handlePostComment}>
                <textarea
                    placeholder='Type your comment here'
                    value={commentContent}
                    onChange={handleInputChange}
                    maxLength={maxCharacters}
                    className='bg-grey-white2 px-4 py-4 rounded-[5px] w-full h-20 mb-4 text-grey focus:outline-strong-blue md:px-15 md:py-4'
                ></textarea>
                <div className='flex items-center justify-between'>
                    <p className='xs:text-[0.625rem] text-grey font-normal px-13 md:px-15'>{remainingCharacters} Characters left</p>
                    <button
                        type="submit"
                        className='flex items-center justify-center px-13 font-bold bg-purple text-white h-10 rounded-[10px] w-[7.438rem] hover:bg-hover-purple md:text-sm md:h-[2.75rem] md:w-[8.875rem]'
                        disabled={commentContent.trim() === ''}
                    >
                        Post Comment
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddComment;