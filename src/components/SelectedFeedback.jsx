import React, { useState } from 'react'
import arrowleft from "../assets/arrowleft.png"
import { useDispatch, useSelector } from 'react-redux'
import arrowup from "../assets/arrowup.png";
import comment from "../assets/comment.png";
import { addcomment } from '../features/state/stateSlice';
import { Link } from 'react-router-dom';

function SelectedFeedback( {toggleView, setToggleView, selectedFeedback} ) {
    const feedback = useSelector((state) => state.state.data.productRequests[selectedFeedback - 1])
    const [commentField, setCommentField] = useState("")
    const dispatch = useDispatch()
  return (
    <main className='absolute top-0 bg-grey-white left-0 right-0 min-h-full p-6 pb-24'>
        <div className='flex justify-between mb-6'>
            <button onClick={(e) => setToggleView(!toggleView)} className='flex items-center gap-1'>
                <img className='w-1 h-2' src={arrowleft} alt='arrowback' />
                <p className='text-grey text-sm font-bold'>Go Back</p>
            </button>
            <Link to={"editfeedback/:" + selectedFeedback} className='bg-strong-blue text-white rounded-xl py-2 px-4'>Edit Feedback</Link>
        </div>
        <div className='bg-white mb-6 p-6 rounded-xl'>
            <h2 className='text-sm font-bold text-blue mb-2'>{feedback.title}</h2>
            <p className='text-grey text-sm font-normal mb-2'>{feedback.description}</p>
            <div className='items-center justify-center bg-grey-white py-2 px-4 rounded-xl text-sm inline-block mb-4'>
                <p className='text-strong-blue font-semibold'>{feedback.category[0].toLocaleUpperCase() + feedback.category.substr(1)}</p>
            </div>
            <div className='flex justify-between'>
                <button className='flex bg-grey-white items-center gap-2 py-1 px-2 rounded-xl'>
                    <img className='w-2 h-1' src={arrowup} alt='arrowup' />
                    <p className='text-sm text-blue font-bold py-1 px-2'>{feedback.upvotes}</p>
                </button>
                <button className='flex items-center gap-1'>
                    <img className='h-4 w-5' src={comment} alt='comments' />
                    <p>{feedback.comments ? feedback.comments.length : 0}</p>
                </button>
            </div>
        </div>
        <div className='bg-white rounded-xl p-6 mb-6'>
        <h2 className='text-lg text-blue font-bold mb-6'>{feedback.comments ? feedback.comments.length : 0} Comments</h2>
        {feedback.comments && feedback.comments.map((comment) => {
            return (<>
                    <div>
                        <div className='flex items-center justify-between'>
                            <div className='flex gap-4 mb-4 items-center'>
                                <img className='rounded-full h-10 w-10' src={comment.user.image} alt={comment.user.name}/>
                                <div>
                                    <p className='text-sm font-bold text-blue'>{comment.user.name}</p>
                                    <p className='text-sm font-normal text-grey'>@{comment.user.username}</p>
                                </div>
                            </div>
                            <button className='text-strong-blue text-sm font-semibold'>Reply</button>
                        </div>
                        <p className='border-b border-grey/25 pb-6 text-grey text-sm font-normal mb-6'>{comment.content}</p>
                    </div>
                    {comment.replies ? <>{comment.replies.map((reply) => {
                        return (
                        <div className='ml-6'>
                            <div className=''>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-4 mb-4'>
                                        <img className='rounded-full h-10 w-10' src={reply.user.image} alt={reply.user.name} />
                                        <div>
                                            <p className='text-sm font-bold text-blue'>{reply.user.name}</p>
                                            <p className='text-sm font-normal text-grey'>@{reply.user.username}</p>
                                        </div>
                                    </div>
                                    <button className='text-strong-blue text-sm font-semibold'>Reply</button>
                                </div>
                            </div>
                            <p className='pb-6 text-grey text-sm font-normal mb-6'><span className='text-purple font-bold'>@{reply.replyingTo}</span> {reply.content}</p>
                        </div>
                        )
                    })}</> : null}
                    </>
                    )
                })}
        </div>
        <div className='bg-white p-6 rounded-xl'>
            <h1 className='text-xl font-bold text-blue mb-6'>Add Comment</h1>
            <textarea maxLength={250} onChange={(e) => setCommentField(e.target.value)} value={commentField} className='bg-grey-white2 w-full h-20 mb-4 text-grey p-4'></textarea>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-grey font-normal'>{250 - commentField.length} Characters left</p>
                <button onClick={(e) => dispatch(addcomment({id: selectedFeedback - 1, content: commentField}, setCommentField("")))} className='bg-purple text-white text-sm py-2 px-4 rounded-xl'>Post Comment</button>
            </div>
        </div>
    </main>
  )
}

export default SelectedFeedback