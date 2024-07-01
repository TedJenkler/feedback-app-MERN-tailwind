import React, { useEffect, useState } from 'react';
import { getAllReplies, replyUser } from '../features/social/socialSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReplyReplyMap from './ReplyReplyMap';
import axios from 'axios';

function ReplyMap({ replies }) {
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllReplies());
    }, [dispatch]);

    const replyState = useSelector((state) => state.social.replies);
    const users = useSelector((state) => state.social.users);
    const username = localStorage.getItem('username');

    const findCommonValues = (replyState, replies) => {
        const set2 = new Set(replies);
        const commonValues = replyState.filter(reply => set2.has(reply._id));
        return commonValues;
    };

    const commonReplies = findCommonValues(replyState, replies);

    const handleToggleReply = (replyId) => {
        if (replyingTo === replyId) {
            setReplyingTo(null);
            setReplyContent('');
        } else {
            setReplyingTo(replyId);
        }
    };

    const handlePostReply = (e) => {
        e.preventDefault();
        dispatch(replyUser({ id: replyingTo, content: replyContent, user: username, replyType: "reply" }));
        setReplyingTo(null);
        setReplyContent('');
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
                                <img className='rounded-full h-10 w-10' src={"../src" + user.img} alt={`${user.firstname} ${user.lastname}`} />
                                <div className=''>
                                    <p className='font-bold text-blue px13 tracking-[-0.18px] capitalize'>{`${user.firstname} ${user.lastname}`}</p>
                                    <p className='font-normal text-grey px13 capitalize'>@{user.username}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleToggleReply(reply._id)}
                                className='text-strong-blue px13 font-semibold hover:underline'
                            >
                                {replyingTo === reply._id ? 'Cancel' : 'Reply'}
                            </button>
                        </div>
                        <div className='mt-2'>
                            <p className='px13 leading-[auto] text-grey'><span className='px13 leading-[auto] text-purple font-bold'>@{reply.replyTo.user}</span> {reply.content}</p>
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

export default ReplyMap;