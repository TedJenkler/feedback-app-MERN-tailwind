import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllComments,
  getAllUsers,
  replyUser,
} from '../features/social/socialSlice';
import ReplyMap from './ReplyMap';

function CommentMap({ id }) {
  const dispatch = useDispatch();
  const comments = useSelector(state => state.social.comments);
  const users = useSelector(state => state.social.users);

  useEffect(() => {
    dispatch(getAllComments());
    dispatch(getAllUsers());
  }, [dispatch]);

  const postComments = comments.filter(comment => comment.post === id);
  const username = localStorage.getItem('username');

  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  const handleToggleReply = commentId => {
    if (replyingTo === commentId) {
      setReplyingTo(null);
      setReplyContent('');
    } else {
      setReplyingTo(commentId);
    }
  };

  const handlePostReply = e => {
    e.preventDefault();
    dispatch(
      replyUser({
        id: replyingTo,
        content: replyContent,
        user: username,
        replyType: 'comment',
      })
    );
    setReplyingTo(null);
    setReplyContent('');
  };

  const getUserImagePath = imgPath => {
    if (process.env.NODE_ENV === 'development') {
      return `../src${imgPath}`;
    } else {
      return imgPath;
    }
  };

  return (
    <div>
      {postComments.length === 0 && <p>No comments found.</p>}
      {postComments.map((comment, index) => {
        const user = users.find(item => item._id === comment.user);

        if (!user) return null;

        return (
          <div
            key={comment._id}
            className={`mb-6 ${postComments.length - 1 === index ? '' : 'border-b border-border-grey/25'} pb-6`}
          >
            <div className='flex justify-between'>
              <div className='flex gap-4'>
                <img
                  className='h-10 w-10 rounded-full'
                  src={getUserImagePath(user.img)}
                  alt={`${user.firstname} ${user.lastname}`}
                />
                <div className=''>
                  <p className='px13 font-bold capitalize tracking-[-0.18px] text-blue'>{`${user.firstname} ${user.lastname}`}</p>
                  <p className='px13 font-normal capitalize text-grey'>
                    @{user.username}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggleReply(comment._id)}
                className='px13 font-semibold text-strong-blue hover:underline'
              >
                {replyingTo === comment._id ? 'Cancel' : 'Reply'}
              </button>
            </div>
            <div className='pt-4'>
              <p className='px13 leading-[auto] text-grey md:ml-14'>
                {comment.content}
              </p>
            </div>
            {replyingTo === comment._id && (
              <div className='mt-2'>
                <textarea
                  className='w-full border border-gray-300 p-2'
                  placeholder='Write your reply...'
                  value={replyContent}
                  onChange={e => setReplyContent(e.target.value)}
                />
                <button
                  onClick={e => handlePostReply(e)}
                  className='hover:bg-blue-600 mt-2 rounded-md bg-purple px-4 py-2 text-white'
                >
                  Post Reply
                </button>
              </div>
            )}
            <ReplyMap replies={comment.replies} />
          </div>
        );
      })}
    </div>
  );
}

export default CommentMap;
