import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import arrowleft from "../assets/arrowleft.png"
import { useSelector, useDispatch } from 'react-redux';
import { deletefeedback, edit } from '../features/state/stateSlice';
import editicon from "../assets/editicon.svg"

function EditFeedback() {
    let { id } = useParams();
    let copyOfId = id.substring(1) - 1;
    const state = useSelector((state) => state.state.data.productRequests[copyOfId])
    const dispatch = useDispatch()
    const [title, setTitle] = useState(state.title)
    const [select1, setSelect1] = useState(state.category)
    const [select2, setSelect2] = useState(state.status)
    const [details, setDetails] = useState(state.description)
    console.log(select1)
    console.log(state)
  return (
    <main className='bg-grey-white2 p-6 h-full pb-20 md:px-28 md:py-14'>
      <img className='absolute left-12 top-20 md:left-40 md:top-28 md:w-14 md:h-14' src={editicon} alt='editicon' />
        <Link to="/" className='flex items-center gap-2 mb-14'>
                <img className='w-1 h-2' src={arrowleft} alt='arrowback' />
                <p className='text-grey text-sm font-bold'>Go Back</p>
        </Link>
        <div className='bg-white flex flex-col rounded-xl p-6 pt-12 md:px-12 md:pt-14 md:pb-10'>
          <h1 className='text-lg font-bold text-blue mb-6 md:text-2xl'>Editing '{state.title}'</h1>
          <h2 className='text-sm text-blue font-bold mb-1'>Feedback Title</h2>
          <p className='text-grey text-sm font-normal mb-4'>Add a short, descriptive headline</p>
          <input onChange={(e) => setTitle(e.target.value)} value={title} className='h-12 bg-grey-white2 p-4 mb-6 rounded-xl text-blue text-sm'></input>
          <h2 className='text-sm font-bold text-blue mb-1'>Category</h2>
          <p className='text-sm font-normal text-grey mb-4'>Choose a category for your feedback</p>
          <select onChange={(e) => setSelect1(e.target.value)} value={select1} className='h-12 bg-grey-white2 px-4 mb-6 rounded-xl'>
            <option value="feature">Feature</option>
            <option value="UI">UI</option>
            <option value="UX">UX</option>
            <option value="enhancement">Enhancement</option>
            <option value="bug">Bug</option>
          </select>
          <h2 className='text-sm font-bold text-blue mb-1'>Update Status</h2>
          <p className='text-sm font-normal text-grey mb-4'>Change feature state</p>
          <select onChange={(e) => setSelect2(e.target.value)} value={select2} className='h-12 bg-grey-white2 px-4 mb-6 rounded-xl'>
            <option value="planned">Planned</option>
            <option value="in-progress">In-Progress</option>
            <option value="live">Live</option>
          </select>
          <h2 className='text-sm font-bold text-blue mb-1'>Feedback Detail</h2>
          <p className='text-sm font-normal text-grey mb-4'>Include any specific comments on what should be improved, added, etc.</p>
          <textarea onChange={(e) => setDetails(e.target.value)} value={details} className='h-32 bg-grey-white2 p-4 mb-10 rounded-xl text-blue text-sm'></textarea>
          <div className='flex flex-col md:flex-row-reverse md:justify-between'>
            <div className='md:flex md:flex-row-reverse md:gap-3'>
              <Link to="/" onClick={(e) => dispatch(edit({id: copyOfId, title: title, category: select1, description: details, status: select2}))} className='bg-purple text-white rounded-xl text-sm py-2 text-bold mb-4 md:py-2 md:mb-0 md:px-5'>Save Changes</Link>
              <Link className='bg-blue text-white rounded-xl text-sm py-2 text-bold mb-4 text-center md:py-2 md:mb-0 md:px-5' to="/">Cancel</Link>
            </div>
            <Link className='bg-red text-white rounded-xl text-sm py-2 text-bold mb-4 text-center md:py-2 md:mb-0 md:px-5' to="/" onClick={(e) => dispatch(deletefeedback(copyOfId))}>Delete</Link>
          </div>
        </div>
    </main>
  )
}

export default EditFeedback