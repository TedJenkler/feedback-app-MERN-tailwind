import React, { useEffect, useState } from 'react';
import { getAllReplies, replyUser } from '../features/social/socialSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReplyReplyMap from './ReplyReplyMap';

function ReplyMap({ replies }) {
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllReplies());
  }, [dispatch]);

  const replyState = useSelector(state => state.social.replies);
  const users = useSelector(state => state.social.users);
  const username = localStorage.getItem('username');

  const findCommonValues = (replyState, replies) => {
    const set2 = new Set(replies);
    const commonValues = replyState.filter(reply => set2.has(reply._id));
    return commonValues;
  };

  const commonReplies = findCommonValues(replyState, replies);

  const handleToggleReply = replyId => {
    if (replyingTo === replyId) {
      setReplyingTo(null);
      setReplyContent('');
    } else {
      setReplyingTo(replyId);
    }
  };

  const handlePostReply = e => {
    e.preventDefault();
    dispatch(
      replyUser({
        id: replyingTo,
        content: replyContent,
        user: username,
        replyType: 'reply',
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
    <div className='ml-8'>
      {commonReplies.map(reply => {
        const user = users.find(item => item._id === reply.user);

        if (!user) return null;

        return (
          <div key={reply._id} className='my-6'>
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
                onClick={() => handleToggleReply(reply._id)}
                className='px13 font-semibold text-strong-blue hover:underline'
              >
                {replyingTo === reply._id ? 'Cancel' : 'Reply'}
              </button>
            </div>
            <div className='mt-2'>
              <p className='px13 leading-[auto] text-grey md:ml-14'>
                <span className='px13 font-bold leading-[auto] text-purple'>
                  @{reply.replyTo.user}
                </span>{' '}
                {reply.content}
              </p>
            </div>
            {replyingTo === reply._id && (
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
            {reply.replies && <ReplyReplyMap replies={reply.replies} />}
          </div>
        );
      })}
    </div>
  );
}

export default ReplyMap;
