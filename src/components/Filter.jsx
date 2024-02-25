import React, { useEffect, useState } from 'react'
import { filter } from '../features/state/stateSlice'
import { useDispatch } from 'react-redux'

function Filter() {
    const [filterBy, setFilterBy] = useState("ALL")
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(filter(filterBy))
    },[filterBy])
  return (
    <div className='bg-white mt-6 mx-6 p-6 flex flex-wrap gap-2 rounded-xl mb-6 pb-9'>
        <button className={filterBy === "ALL" ? 'py-1 px-3 bg-strong-blue text-white rounded-xl text-sm font-semibold' : 'py-1 px-3 bg-grey-white rounded-xl text-sm font-semibold text-strong-blue'} onClick={(e) => {setFilterBy("ALL")}} value={filterBy}>All</button>
        <button className={filterBy === "UI" ? 'py-1 px-3 bg-strong-blue text-white rounded-xl text-sm font-semibold' : 'py-1 px-3 bg-grey-white rounded-xl text-sm font-semibold text-strong-blue'} onClick={(e) => {setFilterBy("UI")}} value={filterBy}>UI</button>
        <button className={filterBy === "UX" ? 'py-1 px-3 bg-strong-blue text-white rounded-xl text-sm font-semibold' : 'py-1 px-3 bg-grey-white rounded-xl text-sm font-semibold text-strong-blue'} onClick={(e) => {setFilterBy("UX")}} value={filterBy}>UX</button>
        <button className={filterBy === "Enhancement" ? 'py-1 px-3 bg-strong-blue text-white rounded-xl text-sm font-semibold' : 'py-1 px-3 bg-grey-white rounded-xl text-sm font-semibold text-strong-blue'} onClick={(e) => {setFilterBy("Enhancement")}} value={filterBy}>Enhancement</button>
        <button className={filterBy === "Bug" ? 'py-1 px-3 bg-strong-blue text-white rounded-xl text-sm font-semibold' : 'py-1 px-3 bg-grey-white rounded-xl text-sm font-semibold text-strong-blue'} onClick={(e) => {setFilterBy("Bug")}} value={filterBy}>Bug</button>
        <button className={filterBy === "Feature" ? 'py-1 px-3 bg-strong-blue text-white rounded-xl text-sm font-semibold' : 'py-1 px-3 bg-grey-white rounded-xl text-sm font-semibold text-strong-blue'} onClick={(e) => {setFilterBy("Feature")}} value={filterBy}>Feature</button>
    </div>
  )
}

export default Filter