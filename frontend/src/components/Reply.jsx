import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { reply } from '../features/state/stateSlice';

function Reply({ selectedFeedback, commentId, replyId }) {
  const dispatch = useDispatch();
  const [replyText, setReplyText] = useState('');

  const handleReply = () => {
    if (replyId) {
      dispatch(
        reply({
          id1: selectedFeedback,
          commentId: commentId,
          replyId: replyId,
          content: replyText,
        })
      );
    } else {
      dispatch(
        reply({
          id1: selectedFeedback,
          commentId: commentId,
          content: replyText,
        })
      );
    }
    setReplyText('');
  };

  return (
    <div className='mb-6 flex w-full items-start gap-4'>
      <textarea
        onChange={e => {
          setReplyText(e.target.value);
        }}
        value={replyText}
        className='h-20 w-full rounded-xl bg-grey-white2 p-4 focus:outline-strong-blue'
      ></textarea>
      <button
        onClick={handleReply}
        className='whitespace-nowrap rounded-xl bg-purple px-4 py-2 text-sm text-white hover:bg-hover-purple'
      >
        Post Reply
      </button>
    </div>
  );
}

export default Reply;
