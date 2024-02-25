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
        <Link to="/" className='flex items-center gap-1'>
                <img className='w-1 h-2' src={arrowleft} alt='arrowback' />
                <p className='text-grey text-sm font-bold'>Go Back</p>
        </Link>
        <div className='bg-white flex flex-col'>
          <h1>Editing '{state.title}'</h1>
          <h2>Feedback Title</h2>
          <p>Add a short, descriptive headline</p>
          <textarea className='h-12 bg-grey-white2'></textarea>
          <h2>Category</h2>
          <p>Choose a category for your feedback</p>
          <select>
            <option>Feature</option>
          </select>
          <h2>Update Status</h2>
          <p>Change feature state</p>
          <select>
            <option>Planned</option>
          </select>
          <h2>Feedback Detail</h2>
          <p>Include any specific comments on what should be improved, added, etc.</p>
          <textarea className='h-32 bg-grey-white2'></textarea>
          <button>Save Changes</button>
          <Link to="/">Cancel</Link>
          <Link to="/" onClick={(e) => dispatch(deletefeedback(copyOfId))}>Delete</Link>
          {console.log(copyOfId)}
        </div>
    </main>
  )
}

export default EditFeedback