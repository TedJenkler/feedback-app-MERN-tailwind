import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { reply } from '../features/state/stateSlice'

function Reply( {replyToggle, selectedFeedback} ) {
    console.log(selectedFeedback)
    console.log(replyToggle)
    const dispatch = useDispatch()
    const [replyText, setReplyText] = useState("")
  return (
    <div className='flex w-full gap-4 items-start mb-6'>
        <textarea onChange={(e) => {setReplyText(e.target.value)}} value={replyText} className='bg-grey-white2 w-full h-20 rounded-xl p-4 focus:outline-strong-blue'></textarea>
        <button onClick={() => dispatch(reply({id1: selectedFeedback, commentId: replyToggle, content: replyText}))} className='bg-purple text-white text-sm py-2 px-4 rounded-xl hover:bg-hover-purple whitespace-nowrap'>Post Reply</button>
    </div>
  )
}

export default Reply