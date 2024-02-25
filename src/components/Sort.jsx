import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { sort } from '../features/state/stateSlice'
import { Link } from 'react-router-dom'

function Sort() {
    const [sortBy, setSortBy] = useState("Most Upvotes")
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(sort(sortBy))
    }, [sortBy])
  return (
    <div className='flex justify-between h-14 items-center text-white px-6 bg-dark-blue text-sm'>
        <div className='flex items-center'>
            <label className='font-normal whitespace-nowrap'>Sort by : </label>
            <select className='bg-dark-blue font-bold w-32 mr-4' onChange={(e) => {setSortBy(e.target.value)}}>
                <option value="Most Upvotes"> Most Upvotes</option>
                <option value="Least Upvotes"> Least Upvotes</option>
                <option value="Most Comments"> Most Comments</option>
                <option value="Least Comments"> Least Comments</option>
            </select>
        </div>
        <Link to="/addfeedback" className='bg-purple rounded-xl px-4 py-2 font-bold whitespace-nowrap'>+ Add Feedback</Link>
    </div>
  )
}

export default Sort