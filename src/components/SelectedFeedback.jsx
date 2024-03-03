import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addcomment, reply } from '../features/state/stateSlice';
import arrowleft from "../assets/arrowleft.png";
import arrowup from "../assets/arrowup.png";
import comment from "../assets/comment.png";
import { upvote } from '../features/state/stateSlice';
import whitearrowup from "../assets/whitearrowup.png"
import Reply from './Reply';

function SelectedFeedback({ toggleView, setToggleView }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const selectedFeedback = parseInt(id);
    const feedback = useSelector((state) => state.state.data.productRequests[selectedFeedback - 1]);
    const upvotes = useSelector((state) => state.state.isUpvoted);
    const [commentField, setCommentField] = useState("");
    const dispatch = useDispatch();
    const [openReplyId, setOpenReplyId] = useState(null);

    const handleUpvote = (id) => {
        dispatch(upvote({ id }));
    }

    const handleToggleReply = (replyId) => {
        setOpenReplyId(replyId === openReplyId ? null : replyId);
    }

    return (
        <main className='absolute top-0 bg-grey-white left-0 right-0 min-w-screen min-h-full p-6 pb-24 md:px-10 md:pt-14 md:pb-32 xl:pt-20 xl:pb-32 xl:px-96'>
            <div className='flex justify-between mb-6'>
                <button onClick={() => navigate(-1)} className='flex items-center gap-1'>
                    <img className='w-1 h-2' src={arrowleft} alt='arrowback' />
                    <p className='text-grey text-sm font-bold hover:text-black'>Go Back</p>
                </button>
                <Link to={"editfeedback/:" + selectedFeedback} className='bg-strong-blue text-white rounded-xl py-2 px-4 hover:bg-hover-blue'>Edit Feedback</Link>
            </div>
            <div className='bg-white mb-6 p-6 rounded-xl md:flex md:flex-row-reverse md:justify-between'>
                <button className='hidden absolute items-center gap-1 md:flex md:relative'>
                    <img className='h-4 w-5' src={comment} alt='comments' />
                    <p>{feedback.comments ? feedback.comments.length : 0}</p>
                </button>
                <div className='md:flex md:flex-row-reverse md:gap-10'>
                    <div>
                        <h2 className='text-sm font-bold text-blue mb-2 md:text-lg'>{feedback.title}</h2>
                        <p className='text-grey text-sm font-normal mb-2 md:text-base'>{feedback.description}</p>
                        <div className='items-center justify-center bg-grey-white py-1 px-4 rounded-xl text-sm inline-block mb-4'>
                            <p className='text-strong-blue font-semibold'>{feedback.category[0].toLocaleUpperCase() + feedback.category.substr(1)}</p>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                    <div className='flex justify-between'>
                        <button onClick={() => handleUpvote(feedback.id)} className={upvotes.includes(feedback.id) ? 'flex bg-strong-blue text-white items-center gap-2 py-1 px-4 rounded-xl md:flex-col md:h-12 md:w-10 md:p-2 hover:bg-hover-blue' : 'flex bg-grey-white text-blue items-center gap-2 py-2 px-4 rounded-xl md:flex-col md:h-12 md:w-10 md:p-2 hover:bg-hover-blue'}>
                            <img className='w-2 h-1' src={upvotes.includes(feedback.id) ? whitearrowup : arrowup} alt='arrowup' />
                            <p className={upvotes.includes(feedback.id) ? 'text-sm text-white font-bold' : 'text-sm text-blue font-bold'}>{feedback.upvotes}</p>
                        </button>
                    </div>
                    <button className='flex items-center gap-1 md:hidden md:absolute'>
                        <img className='h-4 w-5' src={comment} alt='comments' />
                        <p className='font-bold md:text-base'>{feedback.comments ? feedback.comments.length : 0}</p>
                    </button>
                    </div>
                </div>
            </div>
            <div className='bg-white rounded-xl p-6 mb-6 md:px-8 xl:ml-2'>
                <h2 className='text-lg text-blue font-bold mb-6'>{feedback.comments ? feedback.comments.length : 0} Comments</h2>
                {feedback.comments && feedback.comments.map((comment) => (
                    <div key={comment.id}>
                        <div className='flex items-center justify-between'>
                            <div className='flex gap-4 mb-4 items-center'>
                                <img className='rounded-full h-10 w-10' src={comment.user.image} alt={comment.user.name}/>
                                <div>
                                    <p className='text-sm font-bold text-blue'>{comment.user.name}</p>
                                    <p className='text-sm font-normal text-grey'>@{comment.user.username}</p>
                                </div>
                            </div>
                            <button onClick={() => handleToggleReply(comment.id)} className='text-strong-blue text-sm font-semibold hover:underline'>Reply</button>
                        </div>
                        <p className='text-grey text-sm font-normal whitespace-normal h-full overflow-hidden mb-6 md:pl-16 break-words'>{comment.content}</p>
                        {openReplyId === comment.id && <Reply selectedFeedback={selectedFeedback} commentId={comment.id} />}
                        {comment.replies && comment.replies.map((reply) => (
                            <div key={reply.id} className='ml-6'>
                                <div className=''>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-4 mb-4'>
                                            <img className='rounded-full h-10 w-10' src={reply.user.image} alt={reply.user.name} />
                                            <div>
                                                <p className='text-sm font-bold text-blue'>{reply.user.name}</p>
                                                <p className='text-sm font-normal text-grey'>@{reply.user.username}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => handleToggleReply(reply.id)} className='text-strong-blue text-sm font-semibold hover:underline'>Reply</button>
                                    </div>
                                </div>
                                <p className='text-grey text-sm font-normal mb-6 break-words'><span className='text-purple font-bold'>@{reply.replyingTo}</span> {reply.content}</p>
                                {openReplyId === reply.id && <Reply selectedFeedback={selectedFeedback} commentId={comment.id} replyId={reply.id} />}
                                {reply.replies && reply.replies.map((nestedReply) => (
                                    <div key={nestedReply.id} className='ml-6'>
                                        <div className=''>
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center gap-4 mb-4'>
                                                    <img className='rounded-full h-10 w-10' src={nestedReply.user.image} alt={nestedReply.user.name} />
                                                    <div>
                                                        <p className='text-sm font-bold text-blue'>{nestedReply.user.name}</p>
                                                        <p className='text-sm font-normal text-grey'>@{nestedReply.user.username}</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => handleToggleReply(nestedReply.id)} className='text-strong-blue text-sm font-semibold hover:underline'>Reply</button>
                                            </div>
                                        </div>
                                        <p className='text-grey text-sm font-normal mb-6 break-words'><span className='text-purple font-bold'>@{nestedReply.replyingTo}</span> {nestedReply.content}</p>
                                        {openReplyId === nestedReply.id && <Reply selectedFeedback={selectedFeedback} commentId={comment.id} replyId={nestedReply.id} />}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className='bg-white p-6 rounded-xl md:px-8'>
                <h1 className='text-xl font-bold text-blue mb-6'>Add Comment</h1>
                <textarea placeholder='Type your comment here' maxLength={250} onChange={(e) => setCommentField(e.target.value)} value={commentField} className='bg-grey-white2 w-full h-20 mb-4 text-grey p-4 rounded-xl focus:outline-strong-blue'></textarea>
                <div className='flex items-center justify-between'>
                    <p className='text-sm text-grey font-normal'>{250 - commentField.length} Characters left</p>
                    <button onClick={(e) => dispatch(addcomment({id: selectedFeedback - 1, content: commentField}, setCommentField("")))} className='bg-purple text-white text-sm py-2 px-4 rounded-xl hover:bg-hover-purple'>Post Comment</button>
                </div>
            </div>
        </main>
    );
}

export default SelectedFeedback;
