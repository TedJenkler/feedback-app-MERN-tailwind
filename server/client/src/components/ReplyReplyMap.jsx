import React, { useState } from 'react';
import { replyUser } from '../features/social/socialSlice';
import { useDispatch, useSelector } from 'react-redux';

function ReplyReplyMap({ replies }) {
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const dispatch = useDispatch();
    const replyState = useSelector((state) => state.social.replies);
    const users = useSelector((state) => state.social.users);
    const username = localStorage.getItem('username');

    const handleToggleReply = (replyId) => {
        if (replyingTo === replyId) {
            setReplyingTo(null);
            setReplyContent('');
        } else {
            setReplyingTo(replyId);
        }
    };

    const findCommonValues = (replyState, replies) => {
        const set2 = new Set(replies);
        const commonValues = replyState.filter(reply => set2.has(reply._id));
        return commonValues;
    };

    const handlePostReply = (e) => {
        e.preventDefault();
        dispatch(replyUser({ id: replyingTo, content: replyContent, user: username, replyType: "reply" }));
        setReplyingTo(null);
        setReplyContent('');
    };

    const commonReplies = findCommonValues(replyState, replies);

    return (
        <div>
            {commonReplies.map(reply => {
                const user = users.find(item => item._id === reply.user);

                if (!user) return null;

                return (
                    <div key={reply._id} className='mb-4'>
                        <div className='flex items-center space-x-4'>
                            <img className='rounded-full h-10 w-10' src={user.image} alt={`${user.firstname} ${user.lastname}`} />
                            <div>
                                <p className='font-bold'>{`${user.firstname} ${user.lastname}`}</p>
                                <p>@{user.username}</p>
                            </div>
                            <button
                                onClick={() => handleToggleReply(reply._id)}
                                className='text-blue-500 font-semibold hover:underline'
                            >
                                {replyingTo === reply._id ? 'Cancel' : 'Reply'}
                            </button>
                        </div>
                        <div className='mt-2'>
                            <p>{reply.content}</p>
                        </div>
                        {replyingTo === reply._id && (
                            <div className='mt-2'>
                                <textarea
                                    className='border border-gray-300 p-2 w-full'
                                    placeholder='Write your reply...'
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                />
                                <button
                                    onClick={(e) => handlePostReply(e)}
                                    className='mt-2 bg-purple hover:bg-blue-600 text-white py-2 px-4 rounded-md'
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

export default ReplyReplyMap;