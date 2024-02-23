import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { filter } from '../features/state/stateSlice'

function Filter() {
    const [filterBy, setFilterBy] = useState("Most Upvotes")
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(filter(filterBy))
    }, [filterBy])
  return (
    <div className='flex justify-between h-14 items-center text-white px-6 bg-dark-blue text-sm'>
        <div>
            <label className='font-normal'>Sort by : </label>
            <select className='bg-dark-blue font-bold' onChange={(e) => {setFilterBy(e.target.value)}}>
                <option value="Most Upvotes">Most Upvotes</option>
                <option value="Least Upvotes">Least Upvotes</option>
                <option value="Most Comments">Most Comments</option>
                <option value="Least Comments">Least Comments</option>
            </select>
        </div>
        <button className='bg-purple rounded-xl px-4 py-2 font-bold'>+ Add Feedback</button>
    </div>
  )
}

export default Filter