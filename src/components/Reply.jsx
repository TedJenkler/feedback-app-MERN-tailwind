import React from 'react'

function Reply() {
  return (
    <div className='flex w-full gap-4 items-start mb-6'>
        <textarea className='bg-grey-white2 w-full h-20 rounded-xl p-4 focus:outline-strong-blue'></textarea>
        <button className='bg-purple text-white text-sm py-2 px-4 rounded-xl hover:bg-hover-purple whitespace-nowrap'>Post Reply</button>
    </div>
  )
}

export default Reply