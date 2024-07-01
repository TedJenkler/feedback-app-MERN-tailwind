import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllComments, getAllUsers, replyUser } from '../features/social/socialSlice';
import ReplyMap from './ReplyMap';

function CommentMap({ id }) {
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.social.comments);
    const users = useSelector((state) => state.social.users);

    useEffect(() => {
        dispatch(getAllComments());
        dispatch(getAllUsers());
    }, [dispatch]);

    const postComments = comments.filter(comment => comment.post === id);
    const username = localStorage.getItem('username')

    const [replyingTo, setReplyingTo] = useState(null);
    const [replyContent, setReplyContent] = useState('');

    const handleToggleReply = (commentId) => {
        if (replyingTo === commentId) {
            setReplyingTo(null);
            setReplyContent('');
        } else {
            setReplyingTo(commentId);
        }
    };

    const handlePostReply = (e) => {
        e.preventDefault();
        dispatch(replyUser({ id: replyingTo, content: replyContent, user: username, replyType: "comment" }))
        setReplyingTo(null);
        setReplyContent('');
    };

    return (
        <div>
            {postComments.length === 0 && <p>No comments found.</p>}
            {postComments.map((comment, index) => {
                const user = users.find(item => item._id === comment.user);

                if (!user) return null;

                return (
                    <div key={comment._id} className={`mb-6 ${postComments.length - 1 === index ? "" : "border-b border-border-grey/25"} pb-6`}>
                        <div className='flex justify-between'>
                            <div className='flex gap-4'>
                                <img className='rounded-full h-10 w-10' src={"../src" + user.img} alt={`${user.firstname} ${user.lastname}`} />
                                <div className=''>
                                    <p className='font-bold text-blue px13 tracking-[-0.18px] capitalize'>{`${user.firstname} ${user.lastname}`}</p>
                                    <p className='font-normal text-grey px13 capitalize'>@{user.username}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleToggleReply(comment._id)}
                                className='text-strong-blue px13 font-semibold hover:underline'
                            >
                                {replyingTo === comment._id ? 'Cancel' : 'Reply'}
                            </button>
                        </div>
                        <div className='pt-4'>
                            <p className='px13 leading-[auto] text-grey'>{comment.content}</p>
                        </div>
                        {replyingTo === comment._id && (
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
                        <ReplyMap replies={comment.replies} />
                    </div>
                );
            })}
        </div>
    );
}

export default CommentMap;