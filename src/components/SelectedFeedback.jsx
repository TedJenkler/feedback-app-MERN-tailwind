import React from 'react'
import arrowleft from "../assets/arrowleft.png"
import { useDispatch, useSelector } from 'react-redux'
import arrowup from "../assets/arrowup.png";
import comment from "../assets/comment.png";

function SelectedFeedback( {toggleView, setToggleView, selectedFeedback} ) {
    const feedback = useSelector((state) => state.state.data.productRequests[selectedFeedback - 1])
    console.log(feedback)
  return (
    <main className='absolute top-0 bg-grey-white left-0 right-0 h-full p-6'>
        <div className='flex justify-between mb-6'>
            <button onClick={(e) => setToggleView(!toggleView)} className='flex items-center gap-1'>
                <img className='w-1 h-2' src={arrowleft} alt='arrowback' />
                <p className='text-grey text-sm font-bold'>Go Back</p>
            </button>
            <button>Edit Feedback</button>
        </div>
        <div className='bg-white mb-6'>
            <h2>{feedback.title}</h2>
            <p>{feedback.description}</p>
            <div className='items-center justify-center bg-grey-white py-1 px-4 rounded-xl text-sm inline-block mb-4'>
                <p className='text-strong-blue font-semibold'>{feedback.category[0].toLocaleUpperCase() + feedback.category.substr(1)}</p>
            </div>
            <div className='flex justify-between'>
                <button className='flex bg-grey-white items-center gap-2 py-1 px-2 rounded-xl'>
                    <img className='w-2 h-1' src={arrowup} alt='arrowup' />
                    <p className='text-sm text-blue font-bold'>{feedback.upvotes}</p>
                </button>
                <button className='flex items-center gap-1'>
                    <img className='h-4 w-5' src={comment} alt='comments' />
                    <p>{feedback.comments ? feedback.comments.length : 0}</p>
                </button>
            </div>
        </div>
        <div>
        {Object.values(feedback).map((value) => {
                return (
                    <>
                    {Object.values(value).map((comments) => {
                        return (
                            <div className='bg-white'>
                                <div>
                                    {Object.values(comments).map((user) => {
                                        return (
                                            <>
                                                <img src={user.image} alt={user.name} />
                                                <div>
                                                    <p>{user.name}</p>
                                                    <p>{user.username}</p>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                                <h2>{comments.content}</h2>
                            </div>
                        )
                    })}
                    </>
                )
            })}
        </div>
    </main>
  )
}

export default SelectedFeedback