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
    <div>
        <button onClick={(e) => {setFilterBy("ALL")}} value={filterBy}>All</button>
        <button onClick={(e) => {setFilterBy("UI")}} value={filterBy}>UI</button>
        <button onClick={(e) => {setFilterBy("UX")}} value={filterBy}>UX</button>
        <button onClick={(e) => {setFilterBy("Enhancement")}} value={filterBy}>Enhancement</button>
        <button onClick={(e) => {setFilterBy("Bug")}} value={filterBy}>Bug</button>
        <button onClick={(e) => {setFilterBy("Feature")}} value={filterBy}>Feature</button>
    </div>
  )
}

export default Filter