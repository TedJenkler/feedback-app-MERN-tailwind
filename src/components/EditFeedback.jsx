import React from 'react'
import { Link, useParams } from 'react-router-dom';
import arrowleft from "../assets/arrowleft.png"
import { useSelector, useDispatch } from 'react-redux';
import { deletefeedback } from '../features/state/stateSlice';

function EditFeedback() {
    let { id } = useParams();
    let copyOfId = id.substring(1) - 1;
    const state = useSelector((state) => state.state.data.productRequests[copyOfId])
    const dispatch = useDispatch()
    console.log(state)
  return (
    <main className='bg-grey-white2 p-6 h-full'>
        <Link to="/" className='flex items-center gap-2 mb-14'>
                <img className='w-1 h-2' src={arrowleft} alt='arrowback' />
                <p className='text-grey text-sm font-bold'>Go Back</p>
        </Link>
        <div className='bg-white flex flex-col rounded-xl p-6'>
          <h1 className='text-lg font-bold text-blue mb-6'>Editing '{state.title}'</h1>
          <h2 className='text-sm text-blue font-bold mb-1'>Feedback Title</h2>
          <p className='text-grey text-sm font-normal mb-4'>Add a short, descriptive headline</p>
          <input className='h-12 bg-grey-white2 p-4 mb-6 rounded-xl'></input>
          <h2 className='text-sm font-bold text-blue mb-1'>Category</h2>
          <p className='text-sm font-normal text-grey mb-4'>Choose a category for your feedback</p>
          <select className='h-12 bg-grey-white2 px-4 mb-6 rounded-xl'>
            <option>Feature</option>
          </select>
          <h2 className='text-sm font-bold text-blue mb-1'>Update Status</h2>
          <p className='text-sm font-normal text-grey mb-4'>Change feature state</p>
          <select className='h-12 bg-grey-white2 px-4 mb-6 rounded-xl'>
            <option>Planned</option>
          </select>
          <h2 className='text-sm font-bold text-blue mb-1'>Feedback Detail</h2>
          <p className='text-sm font-normal text-grey mb-4'>Include any specific comments on what should be improved, added, etc.</p>
          <textarea className='h-32 bg-grey-white2 p-4 mb-10 rounded-xl'></textarea>
          <button className='bg-purple text-white rounded-xl text-sm py-2 text-bold mb-4'>Save Changes</button>
          <Link className='bg-blue text-white rounded-xl text-sm py-2 text-bold mb-4 text-center' to="/">Cancel</Link>
          <Link className='bg-red text-white rounded-xl text-sm py-2 text-bold mb-4 text-center' to="/" onClick={(e) => dispatch(deletefeedback(copyOfId))}>Delete</Link>
        </div>
    </main>
  )
}

export default EditFeedback