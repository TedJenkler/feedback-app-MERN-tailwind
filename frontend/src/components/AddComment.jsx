import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../features/social/socialSlice';

function AddComment({ postId }) {
  const dispatch = useDispatch();
  const [commentContent, setCommentContent] = useState('');
  const maxCharacters = 250;
  const username = localStorage.getItem('username');

  const handleInputChange = e => {
    const content = e.target.value;
    setCommentContent(content.slice(0, maxCharacters));
  };

  const handlePostComment = e => {
    e.preventDefault();
    if (commentContent.trim() === '') return;
    dispatch(addComment({ content: commentContent, user: username, postId }));
    setCommentContent('');
  };

  const remainingCharacters = maxCharacters - commentContent.length;

  return (
    <div className='rounded-xl bg-white p-6 md:px-8'>
      <h1 className='mb-6 text-lg font-bold text-blue'>Add Comment</h1>
      <form onSubmit={handlePostComment}>
        <textarea
          placeholder='Type your comment here'
          value={commentContent}
          onChange={handleInputChange}
          maxLength={maxCharacters}
          className='md:px-15 mb-4 h-20 w-full rounded-[5px] bg-grey-white2 px-4 py-4 text-grey focus:outline-strong-blue md:py-4'
        ></textarea>
        <div className='flex items-center justify-between'>
          <p className='px-13 md:px-15 font-normal text-grey xs:text-[0.625rem]'>
            {remainingCharacters} Characters left
          </p>
          <button
            type='submit'
            className='px-13 flex h-10 w-[7.438rem] items-center justify-center rounded-[10px] bg-purple font-bold text-white hover:bg-hover-purple md:h-[2.75rem] md:w-[8.875rem] md:text-sm'
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
