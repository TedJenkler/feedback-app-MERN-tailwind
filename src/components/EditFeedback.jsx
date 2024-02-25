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
    <main className='bg-grey-white2 p-6 h-full pb-20'>
      <img className='absolute left-12 top-20' src={editicon} alt='editicon' />
        <Link to="/" className='flex items-center gap-2 mb-14'>
                <img className='w-1 h-2' src={arrowleft} alt='arrowback' />
                <p className='text-grey text-sm font-bold'>Go Back</p>
        </Link>
        <div className='bg-white flex flex-col rounded-xl p-6 pt-12'>
          <h1 className='text-lg font-bold text-blue mb-6'>Editing '{state.title}'</h1>
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
          <button onClick={(e) => dispatch(edit({id: copyOfId, title: title, category: select1, description: details, status: select2}))} className='bg-purple text-white rounded-xl text-sm py-2 text-bold mb-4'>Save Changes</button>
          <Link className='bg-blue text-white rounded-xl text-sm py-2 text-bold mb-4 text-center' to="/">Cancel</Link>
          <Link className='bg-red text-white rounded-xl text-sm py-2 text-bold mb-4 text-center' to="/" onClick={(e) => dispatch(deletefeedback(copyOfId))}>Delete</Link>
        </div>
    </main>
  )
}

export default EditFeedback